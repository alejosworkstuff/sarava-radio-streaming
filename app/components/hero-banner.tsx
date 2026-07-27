"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { resolvePublicAssetSrc, type HeroSlide } from "@/lib/hero-slides";

type HeroBannerProps = {
  slides: HeroSlide[];
};

function HeroSlideImage({
  src,
  alt,
  fill,
  priority,
  sizes,
  className,
  width,
  height,
}: {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const resolved = resolvePublicAssetSrc(src, basePath);

  if (resolved.startsWith("data:")) {
    if (fill) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={resolved}
          alt={alt}
          className={className}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      );
    }
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={resolved}
        alt={alt}
        width={width ?? 640}
        height={height ?? 800}
        className={className}
      />
    );
  }

  if (fill) {
    return (
      <Image
        src={resolved}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={resolved}
      alt={alt}
      width={width ?? 640}
      height={height ?? 800}
      sizes={sizes}
      className={className}
      priority={priority}
    />
  );
}

function SlideBody({
  item,
  active,
  reduceMotion,
}: {
  item: HeroSlide;
  active: boolean;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.div
      className="hero-promo__body"
      key={item.id}
      initial={reduceMotion || !active ? false : { opacity: 0, y: 12 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={
        reduceMotion ? { duration: 0 } : { duration: 0.4, ease: "easeOut" }
      }
    >
      <div className="hero-promo__text">
        {item.author ? (
          <p className="hero-promo__author">{item.author}</p>
        ) : null}
        <h1 className="section-title hero-promo__title">{item.title}</h1>
        {item.subtitle ? (
          <p className="hero-subtitle hero-promo__subtitle">{item.subtitle}</p>
        ) : null}
        {item.description ? (
          <p className="hero-promo__description">{item.description}</p>
        ) : null}
      </div>

      <Link
        href={item.link}
        className="hero-promo__cta cta"
        tabIndex={active ? undefined : -1}
        {...(item.link.startsWith("http")
          ? { target: "_blank", rel: "noreferrer" }
          : {})}
      >
        Llevame ahí
      </Link>
    </motion.div>
  );
}

export default function HeroBanner({ slides }: HeroBannerProps) {
  const [current, setCurrent] = React.useState(0);
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(
    null,
  );
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);
  const reduceMotion = useReducedMotion();
  const n = slides.length;

  const nextSlide = React.useCallback(
    () => setCurrent((prev) => (prev + 1) % n),
    [n],
  );
  const prevSlide = () => setCurrent((prev) => (prev - 1 + n) % n);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  React.useEffect(() => {
    setCurrent((prev) => (prev >= n ? 0 : prev));
  }, [n]);

  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(query.matches);

    const onChange = (event: MediaQueryListEvent) =>
      setPrefersReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  React.useEffect(() => {
    if (n <= 1 || prefersReducedMotion || lightboxIndex !== null) {
      return;
    }

    const timer = window.setInterval(nextSlide, 4000);
    return () => window.clearInterval(timer);
  }, [n, nextSlide, prefersReducedMotion, lightboxIndex]);

  React.useEffect(() => {
    if (lightboxIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxIndex]);

  if (n === 0) {
    return (
      <section className="hero-promo" aria-label="Destacados">
        <div className="hero-promo__shell">
          <p className="hero-subtitle" style={{ padding: "1.5rem" }}>
            Todavía no hay destacados. Marcá posts, eventos o la novela del mes
            como destacados desde el admin para que aparezcan acá.
          </p>
        </div>
      </section>
    );
  }

  const trackStyle: React.CSSProperties = {
    width: `${n * 100}%`,
    transform: `translateX(-${(current * 100) / n}%)`,
  };

  const lightboxSlide =
    lightboxIndex !== null && slides[lightboxIndex]?.hasImage
      ? slides[lightboxIndex]
      : null;

  return (
    <motion.section
      className="hero-promo"
      aria-label="Destacados"
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduceMotion ? { duration: 0 } : { duration: 0.5, ease: "easeOut" }
      }
    >
      <div className="hero-promo__shell">
        <div className="hero-promo__viewport">
          <div className="hero-promo__track" style={trackStyle}>
            {slides.map((item, idx) => {
              const active = current === idx;
              const textOnly = !item.hasImage || !item.image;

              return (
                <article
                  key={item.id}
                  className="hero-promo__slide"
                  style={{ width: `${100 / n}%` }}
                  aria-hidden={!active}
                  {...(!active ? { inert: true } : {})}
                >
                  <div
                    className={
                      textOnly
                        ? "hero-promo__content hero-promo__content--text-only"
                        : "hero-promo__content"
                    }
                  >
                    {!textOnly ? (
                      <button
                        type="button"
                        className="hero-promo__media"
                        onClick={() => openLightbox(idx)}
                        aria-label={`Ver imagen completa: ${item.title}`}
                        tabIndex={active ? undefined : -1}
                      >
                        <HeroSlideImage
                          src={item.image!}
                          alt=""
                          fill
                          sizes="(max-width: 768px) 92vw, 320px"
                          className="hero-promo__image"
                          priority={idx === 0}
                        />
                        <span
                          className="hero-promo__media-hint"
                          aria-hidden="true"
                        >
                          <span className="hero-promo__media-hint-icon">⤢</span>
                          Ver completa
                        </span>
                      </button>
                    ) : null}

                    <SlideBody
                      item={item}
                      active={active}
                      reduceMotion={reduceMotion}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {n > 1 ? (
          <nav
            className="hero-promo__pager slider-controls"
            aria-label="Carrusel principal"
          >
            <button
              type="button"
              onClick={prevSlide}
              className="pill nav-btn"
              aria-label="Anterior"
            >
              ← Anterior
            </button>
            <div className="slider-dots">
              {slides.map((item, dotIdx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrent(dotIdx)}
                  aria-label={`Slide ${dotIdx + 1}: ${item.title}`}
                  aria-current={current === dotIdx ? "true" : undefined}
                  className={
                    current === dotIdx
                      ? "hero-slider-dot hero-slider-dot--active"
                      : "hero-slider-dot"
                  }
                />
              ))}
            </div>
            <button
              type="button"
              onClick={nextSlide}
              className="pill nav-btn"
              aria-label="Siguiente"
            >
              Siguiente →
            </button>
          </nav>
        ) : null}
      </div>

      {lightboxSlide?.image ? (
        <div
          className="hero-promo-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Imagen completa: ${lightboxSlide.title}`}
        >
          <button
            type="button"
            className="hero-promo-lightbox__backdrop"
            onClick={closeLightbox}
            aria-label="Cerrar"
          />
          <div className="hero-promo-lightbox__panel">
            <button
              ref={closeButtonRef}
              type="button"
              className="hero-promo-lightbox__close"
              onClick={closeLightbox}
              aria-label="Cerrar imagen"
            >
              ×
            </button>
            <p className="hero-promo-lightbox__title">{lightboxSlide.title}</p>
            <div className="hero-promo-lightbox__frame">
              <HeroSlideImage
                src={lightboxSlide.image}
                alt={lightboxSlide.title}
                width={640}
                height={800}
                sizes="(max-width: 768px) 96vw, 640px"
                className="hero-promo-lightbox__image"
              />
            </div>
          </div>
        </div>
      ) : null}
    </motion.section>
  );
}
