"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArchiveReveal } from "./archive-reveal";
import { NovelArchiveGallery } from "./novel-archive-gallery";
import type { NovelEntry } from "@/lib/content";

type ClubLecturaSectionProps = {
  novel: NovelEntry | null;
  archive: NovelEntry[];
};

function NovelBlock({ novel }: { novel: NovelEntry }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const reduceMotion = useReducedMotion();
  const coverSrc = novel.coverImage.startsWith("http")
    ? novel.coverImage
    : `${basePath}${novel.coverImage}`;

  return (
    <motion.article
      className="post-card"
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={
        reduceMotion ? { duration: 0 } : { duration: 0.4, ease: "easeOut" }
      }
      whileHover={
        reduceMotion
          ? undefined
          : { y: -4, boxShadow: "0 20px 40px rgba(36, 28, 26, 0.12)" }
      }
    >
      <div className="book-feature">
        {novel.coverImage ? (
          <Image
            src={coverSrc}
            alt={`Portada de ${novel.title}`}
            width={240}
            height={360}
            className="book-cover"
            sizes="(max-width: 768px) 60vw, 240px"
            priority
          />
        ) : (
          <div className="book-cover content-placeholder">Sin portada</div>
        )}
        <div className="book-copy">
          <h3 className="post-title">{novel.title}</h3>
          <div className="post-excerpt">
            {novel.description.split("\n\n").map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
          {novel.pdfUrl ? (
            <p className="mt-4">
              <a
                className="pill nav-btn"
                href={novel.pdfUrl}
                target="_blank"
                rel="noreferrer"
                download
              >
                Descargar PDF
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

export function ClubLecturaSection({ novel, archive }: ClubLecturaSectionProps) {
  return (
    <section className="section lg:min-h-[32rem]">
      <h2 className="section-title mb-6">La novela del mes</h2>
      <p className="hero-subtitle mb-8 max-w-prose">
        Espacio para compartir lecturas, fragmentos y encuentros alrededor de la
        novela elegida.
      </p>

      {novel ? (
        <div className="post-list">
          <NovelBlock novel={novel} />
        </div>
      ) : (
        <p className="hero-subtitle">No hay novela del mes cargada.</p>
      )}

      <ArchiveReveal
        buttonLabel="Ver novelas anteriores"
        hideLabel="Ocultar novelas anteriores"
        emptyMessage="Todavía no hay novelas anteriores en el archivo."
        ariaLabel="Novelas anteriores"
        items={archive}
        renderContent={(items) => <NovelArchiveGallery novels={items} />}
      />
    </section>
  );
}
