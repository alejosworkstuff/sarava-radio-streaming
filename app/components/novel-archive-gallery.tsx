"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { NovelEntry } from "@/lib/content";

type NovelArchiveGalleryProps = {
  novels: NovelEntry[];
};

function coverSrcFor(novel: NovelEntry) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return novel.coverImage.startsWith("http")
    ? novel.coverImage
    : `${basePath}${novel.coverImage}`;
}

export function NovelArchiveGallery({ novels }: NovelArchiveGalleryProps) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const detailId = useId();
  const selected = novels.find((novel) => novel.slug === selectedSlug) ?? null;

  function toggleNovel(slug: string) {
    setSelectedSlug((current) => (current === slug ? null : slug));
  }

  return (
    <div className="novel-archive">
      <ul className="novel-archive-grid" role="list">
        {novels.map((novel) => {
          const isSelected = novel.slug === selectedSlug;
          const coverSrc = coverSrcFor(novel);

          return (
            <li key={novel.slug} className="novel-archive-item">
              <button
                type="button"
                className={`novel-archive-cover-btn${isSelected ? " is-selected" : ""}`}
                aria-expanded={isSelected}
                aria-controls={detailId}
                onClick={() => toggleNovel(novel.slug)}
              >
                {novel.coverImage ? (
                  <Image
                    src={coverSrc}
                    alt={`Portada de ${novel.title}`}
                    width={200}
                    height={300}
                    className="novel-archive-cover"
                    sizes="(max-width: 640px) 40vw, 160px"
                  />
                ) : (
                  <span className="novel-archive-cover content-placeholder">
                    Sin portada
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <div id={detailId} className="novel-archive-detail-slot" aria-live="polite">
        <AnimatePresence initial={false} mode="wait">
          {selected ? (
            <motion.article
              key={selected.slug}
              className="novel-archive-detail"
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: 6 }}
              transition={
                reduceMotion ? { duration: 0 } : { duration: 0.28, ease: "easeOut" }
              }
            >
              <h3 className="post-title">{selected.title}</h3>
              <div className="novel-archive-excerpt">
                {selected.description.split("\n\n").map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
              {selected.pdfUrl ? (
                <p className="mt-4">
                  <a
                    className="pill nav-btn"
                    href={selected.pdfUrl}
                    target="_blank"
                    rel="noreferrer"
                    download
                  >
                    Descargar PDF
                  </a>
                </p>
              ) : null}
            </motion.article>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
