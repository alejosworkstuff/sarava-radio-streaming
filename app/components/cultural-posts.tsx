import Image from "next/image";
import Link from "next/link";
import { culturalPosts } from "../content";

type CulturalPostsListProps = {
  variant?: "list" | "showcase";
};

export function CulturalPostsList({
  variant = "list",
}: CulturalPostsListProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const postsMarkup = (
    <div className="post-list">
      {culturalPosts.map((post) => (
        <article className="post-card" key={`${post.title}-${post.date}`}>
          <div className="post-header">
            <Image
              src={`${basePath}${post.image}`}
              alt={`Foto de ${post.author}`}
              width={56}
              height={56}
              className="avatar"
            />
            <div>
              <p className="post-meta">{`${post.author} · ${post.date}`}</p>
              <h3 className="post-title">{post.title}</h3>
            </div>
          </div>
          <p className="hero-subtitle">{post.excerpt}</p>
          <div className="post-tags">
            {post.tags.map((tag) => (
              <span className="pill" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );

  if (variant === "showcase") {
    return (
      <Link
        href="/espacio-cultural"
        className="posts-shell posts-shell-link"
        aria-label="Leer más en Espacio Cultural"
      >
        {postsMarkup}
        <div className="posts-shell-overlay" aria-hidden="true">
          <span className="posts-shell-overlay-text">Leer más</span>
        </div>
      </Link>
    );
  }

  return postsMarkup;
}
