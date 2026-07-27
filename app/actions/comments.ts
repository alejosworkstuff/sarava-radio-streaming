"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
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
  postTitle?: string | null;
  novelTitle?: string | null;
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
  post?: { title: string } | null;
  novel?: { title: string } | null;
}): CommentView {
  return {
    id: comment.id,
    body: comment.body,
    authorClerkId: comment.authorClerkId,
    authorName: comment.authorName,
    authorImage: comment.authorImage,
    createdAt: comment.createdAt.toISOString(),
    postId: comment.postId,
    novelId: comment.novelId,
    postTitle: comment.post?.title ?? null,
    novelTitle: comment.novel?.title ?? null,
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

  if (!body) {
    return { ok: false, error: "El comentario no puede estar vacío." };
  }
  if (body.length > MAX_BODY) {
    return {
      ok: false,
      error: `El comentario supera ${MAX_BODY} caracteres.`,
    };
  }

  if ((postId && novelId) || (!postId && !novelId)) {
    return {
      ok: false,
      error: "El comentario debe pertenecer a una publicación o a una novela.",
    };
  }

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
  revalidatePath("/admin/comments");

  return { ok: true, message: "Comentario eliminado" };
}
