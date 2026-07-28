"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import {
  COMMENT_PAGE_KEYS,
  isCommentPageKey,
  type CommentPageKey,
} from "@/lib/comment-pages";
import { prisma } from "@/lib/db";
import type { ActionResult } from "@/app/actions/cms";

const MAX_BODY = 2000;

export type CommentView = {
  id: string;
  body: string;
  authorClerkId: string;
  authorName: string;
  authorImage: string | null;
  createdAt: string;
  postId: string | null;
  novelId: string | null;
  pageKey: string | null;
  postTitle?: string | null;
  novelTitle?: string | null;
  pageLabel?: string | null;
};

function mapComment(comment: {
  id: string;
  body: string;
  authorClerkId: string;
  authorName: string;
  authorImage: string | null;
  createdAt: Date;
  postId: string | null;
  novelId: string | null;
  pageKey: string | null;
  post?: { title: string } | null;
  novel?: { title: string } | null;
}): CommentView {
  const pageLabel =
    comment.pageKey && isCommentPageKey(comment.pageKey)
      ? COMMENT_PAGE_KEYS[comment.pageKey].label
      : comment.pageKey;

  return {
    id: comment.id,
    body: comment.body,
    authorClerkId: comment.authorClerkId,
    authorName: comment.authorName,
    authorImage: comment.authorImage,
    createdAt: comment.createdAt.toISOString(),
    postId: comment.postId,
    novelId: comment.novelId,
    pageKey: comment.pageKey,
    postTitle: comment.post?.title ?? null,
    novelTitle: comment.novel?.title ?? null,
    pageLabel: pageLabel ?? null,
  };
}

export async function listCommentsForPost(
  postId: string,
): Promise<CommentView[]> {
  const comments = await prisma.comment.findMany({
    where: { postId },
    orderBy: { createdAt: "asc" },
  });
  return comments.map(mapComment);
}

export async function listCommentsForNovel(
  novelId: string,
): Promise<CommentView[]> {
  const comments = await prisma.comment.findMany({
    where: { novelId },
    orderBy: { createdAt: "asc" },
  });
  return comments.map(mapComment);
}

export async function listCommentsForPage(
  pageKey: CommentPageKey,
): Promise<CommentView[]> {
  const comments = await prisma.comment.findMany({
    where: { pageKey },
    orderBy: { createdAt: "asc" },
  });
  return comments.map(mapComment);
}

export async function listAllComments(): Promise<CommentView[]> {
  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      post: { select: { title: true } },
      novel: { select: { title: true } },
    },
    take: 200,
  });
  return comments.map(mapComment);
}

function targetCount(
  postId: string | null,
  novelId: string | null,
  pageKey: string | null,
) {
  return [postId, novelId, pageKey].filter(Boolean).length;
}

export async function createCommentAction(
  formData: FormData,
): Promise<ActionResult> {
  const { userId } = await auth();
  if (!userId) {
    return { ok: false, error: "Iniciá sesión para comentar." };
  }

  const user = await currentUser();
  if (!user) {
    return { ok: false, error: "Iniciá sesión para comentar." };
  }

  const body = String(formData.get("body") ?? "").trim();
  const postId = String(formData.get("postId") ?? "").trim() || null;
  const novelId = String(formData.get("novelId") ?? "").trim() || null;
  const pageKeyRaw = String(formData.get("pageKey") ?? "").trim() || null;

  if (!body) {
    return { ok: false, error: "El comentario no puede estar vacío." };
  }
  if (body.length > MAX_BODY) {
    return {
      ok: false,
      error: `El comentario supera ${MAX_BODY} caracteres.`,
    };
  }

  if (targetCount(postId, novelId, pageKeyRaw) !== 1) {
    return {
      ok: false,
      error:
        "El comentario debe pertenecer a una publicación, novela o página.",
    };
  }

  if (pageKeyRaw && !isCommentPageKey(pageKeyRaw)) {
    return { ok: false, error: "Página de comentarios no válida." };
  }
  const pageKey = pageKeyRaw as CommentPageKey | null;

  if (postId) {
    const post = await prisma.post.findFirst({
      where: { id: postId, published: true },
      select: { id: true, slug: true },
    });
    if (!post) {
      return { ok: false, error: "Publicación no encontrada." };
    }
  }

  if (novelId) {
    const novel = await prisma.novel.findFirst({
      where: { id: novelId, published: true, active: true },
      select: { id: true },
    });
    if (!novel) {
      return { ok: false, error: "Novela destacada no encontrada." };
    }
  }

  const authorName =
    user.fullName?.trim() ||
    user.firstName?.trim() ||
    user.username?.trim() ||
    user.emailAddresses[0]?.emailAddress?.split("@")[0] ||
    "Lector/a";

  await prisma.comment.create({
    data: {
      body,
      authorClerkId: userId,
      authorName,
      authorImage: user.imageUrl ?? null,
      postId,
      novelId,
      pageKey,
    },
  });

  if (postId) {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { slug: true },
    });
    if (post) {
      revalidatePath(`/espacio-cultural/${post.slug}`);
      revalidatePath("/espacio-cultural");
    }
  }
  if (novelId) {
    revalidatePath("/club-lectura");
  }
  if (pageKey) {
    revalidatePath(COMMENT_PAGE_KEYS[pageKey].path);
  }
  revalidatePath("/admin/comments");

  return { ok: true, message: "Comentario publicado" };
}

export async function deleteCommentAction(
  formData: FormData,
): Promise<ActionResult> {
  const commentId = String(formData.get("id") ?? "").trim();
  if (!commentId) {
    return { ok: false, error: "Comentario inválido." };
  }

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
    include: {
      post: { select: { slug: true } },
      novel: { select: { id: true } },
    },
  });

  if (!comment) {
    return { ok: false, error: "Comentario no encontrado." };
  }

  const { userId } = await auth();
  if (!userId) {
    return { ok: false, error: "No autenticado." };
  }

  const admin = await requireAdmin();
  const isOwner = comment.authorClerkId === userId;
  if (!isOwner && !admin.ok) {
    return { ok: false, error: "Sin permisos para eliminar este comentario." };
  }

  await prisma.comment.delete({ where: { id: commentId } });

  if (comment.post?.slug) {
    revalidatePath(`/espacio-cultural/${comment.post.slug}`);
    revalidatePath("/espacio-cultural");
  }
  if (comment.novelId) {
    revalidatePath("/club-lectura");
  }
  if (comment.pageKey && isCommentPageKey(comment.pageKey)) {
    revalidatePath(COMMENT_PAGE_KEYS[comment.pageKey].path);
  }
  revalidatePath("/admin/comments");

  return { ok: true, message: "Comentario eliminado" };
}
