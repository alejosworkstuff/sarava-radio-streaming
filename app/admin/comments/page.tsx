import { deleteCommentAction, listAllComments } from "@/app/actions/comments";
import { DeleteButton } from "../components/admin-form";

export default async function AdminCommentsPage() {
  const comments = await listAllComments();

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <p className="pill">Moderación</p>
        <h1>Comentarios</h1>
        <p>Listado reciente. Podés eliminar comentarios inapropiados.</p>
      </header>

      <section className="admin-panel">
        {comments.length === 0 ? (
          <p className="admin-item-meta">Todavía no hay comentarios.</p>
        ) : (
          <ul className="admin-comment-list">
            {comments.map((comment) => (
              <li key={comment.id} className="admin-comment-item">
                <div className="admin-comment-body">
                  <p className="admin-item-meta">
                    <strong>{comment.authorName}</strong>
                    {" · "}
                    {comment.postTitle
                      ? `Post: ${comment.postTitle}`
                      : comment.novelTitle
                        ? `Novela: ${comment.novelTitle}`
                        : "Sin destino"}
                    {" · "}
                    {new Date(comment.createdAt).toLocaleString("es-AR")}
                  </p>
                  <p>{comment.body}</p>
                </div>
                <DeleteButton action={deleteCommentAction} id={comment.id} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
