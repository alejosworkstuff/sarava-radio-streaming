import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../components/site-shell";
import { getPostBySlug } from "@/lib/content";
import { buildPageMetadata } from "@/lib/site-metadata";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Publicación no encontrada" };
  }

  return buildPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/espacio-cultural/${slug}`,
    image: post.image,
  });
}

export default async function CulturalPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <div className="page">
      <SiteHeader title="Saravá Espacio Cultural" />

      <main>
        <section className="section">
          <Link href="/espacio-cultural" className="pill nav-btn post-back-link">
            ← Volver al espacio cultural
          </Link>

          <article className="post-card post-detail">
            <div className="post-header">
              <Image
                src={`${basePath}${post.image}`}
                alt={`Foto de ${post.author}`}
                width={56}
                height={56}
                className="avatar"
              />
              <div>
                <p className="post-meta">{`${post.author} · ${post.displayDate}`}</p>
                <h1 className="post-title">{post.title}</h1>
              </div>
            </div>

            <div className="post-detail-featured">
              <Image
                src={`${basePath}${post.image}`}
                alt=""
                width={960}
                height={540}
                className="post-detail-featured-image"
              />
            </div>

            <div className="post-excerpt live-post-body">
              <p>{post.excerpt}</p>
            </div>

            <div className="post-tags">
              {post.tags.map((tag) => (
                <span className="pill" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </article>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
