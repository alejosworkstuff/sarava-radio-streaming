"use client";

import Link from "next/link";
import Image from "next/image";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  createCommentAction,
  deleteCommentAction,
  type CommentView,
} from "@/app/actions/comments";

type CommentSectionProps = {
  postId?: string;
  novelId?: string;
  pageKey?: string;
  initialComments: CommentView[];
  currentUserId: string | null;
  canModerate: boolean;
};

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("es-AR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function CommentSection({
  postId,
  novelId,
  pageKey,
  initialComments,
  currentUserId,
  canModerate,
}: CommentSectionProps) {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <section className="comments-section" aria-label="Comentarios">
      <h2 className="section-title comments-title">Comentarios</h2>

      {initialComments.length === 0 ? (
        <p className="comments-empty">
          Todavía no hay comentarios. Sé la primera voz.
        </p>
      ) : (
        <ul className="comments-list">
          {initialComments.map((comment) => {
            const canDelete =
              canModerate || comment.authorClerkId === currentUserId;
            return (
              <li key={comment.id} className="comment-item">
                <div className="comment-header">
                  {comment.authorImage ? (
                    <Image
                      src={comment.authorImage}
                      alt=""
                      width={36}
                      height={36}
                      className="comment-avatar"
                    />
                  ) : (
                    <span
                      className="comment-avatar comment-avatar-fallback"
                      aria-hidden
                    >
                      {comment.authorName.slice(0, 1).toUpperCase()}
                    </span>
                  )}
                  <div className="comment-meta">
                    <strong>{comment.authorName}</strong>
                    <time dateTime={comment.createdAt}>
                      {formatDate(comment.createdAt)}
                    </time>
                  </div>
                  {canDelete ? (
                    <button
                      type="button"
                      className="comment-delete"
                      disabled={pending}
                      onClick={() => {
                        if (!window.confirm("¿Eliminar este comentario?")) {
                          return;
                        }
                        const formData = new FormData();
                        formData.set("id", comment.id);
                        setError(null);
                        startTransition(async () => {
                          const result = await deleteCommentAction(formData);
                          if (!result.ok) {
                            setError(result.error);
                            return;
                          }
                          router.refresh();
                        });
                      }}
                    >
                      Eliminar
                    </button>
                  ) : null}
                </div>
                <p className="comment-body">{comment.body}</p>
              </li>
            );
          })}
        </ul>
      )}

      {isSignedIn ? (
        <form
          className="comment-form"
          onSubmit={(event) => {
            event.preventDefault();
            const form = event.currentTarget;
            const formData = new FormData(form);
            setError(null);
            startTransition(async () => {
              const result = await createCommentAction(formData);
              if (!result.ok) {
                setError(result.error);
                return;
              }
              form.reset();
              router.refresh();
            });
          }}
        >
          {postId ? <input type="hidden" name="postId" value={postId} /> : null}
          {novelId ? (
            <input type="hidden" name="novelId" value={novelId} />
          ) : null}
          {pageKey ? (
            <input type="hidden" name="pageKey" value={pageKey} />
          ) : null}
          <label>
            Tu comentario
            <textarea
              name="body"
              rows={4}
              maxLength={2000}
              required
              placeholder="Compartí una idea, una duda o un saludo…"
            />
          </label>
          {error ? (
            <p className="comments-error" role="alert">
              {error}
            </p>
          ) : null}
          <button className="pill nav-btn" type="submit" disabled={pending}>
            {pending ? "Publicando…" : "Publicar comentario"}
          </button>
        </form>
      ) : (
        <p className="comments-signin">
          <SignInButton mode="modal">
            <button type="button" className="pill nav-btn">
              Iniciá sesión para comentar
            </button>
          </SignInButton>
          <span>
            {" "}
            o{" "}
            <Link href="/sign-up" className="comments-signup-link">
              creá una cuenta
            </Link>
            .
          </span>
        </p>
      )}
    </section>
  );
}
