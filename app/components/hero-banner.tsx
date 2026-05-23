'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SLIDES = [
  {
    id: 'novel',
    title: 'Las indignas',
    subtitle: 'Novela del Mes',
    description:
      'En un mundo arrasado por catástrofes y contaminación, un grupo de mujeres habita la Casa de la Hermandad Sagrada, aislada del resto de la humanidad.',
    image: '/club-lectura-las-indignas.png',
    link: '/club-lectura',
    width: 442,
    height: 442,
  },
  {
    id: 'podcast',
    title: 'Podcast Saravá',
    subtitle: 'Sintoniza nuestras historias.',
    description:
      'Nuevos episodios todos los martes sobre arte, política y cultura local.',
    image: '/foto-1.jpg',
    link: '/podcast',
    width: 800,
    height: 1000,
  },
  {
    id: 'streaming',
    title: 'Streaming en Vivo',
    subtitle: 'Participa de nuestros encuentros.',
    description:
      'Talleres y debates en vivo desde nuestro centro cultural.',
    image: '/foto-2.jpg',
    link: '/radio-streaming',
    width: 800,
    height: 1000,
  },
] as const;

export default function HeroBanner() {
  const [current, setCurrent] = React.useState(0);
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(
    null
  );
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const n = SLIDES.length;
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % n);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + n) % n);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  React.useEffect(() => {
    setLightboxIndex(null);
  }, [current]);

  React.useEffect(() => {
    if (lightboxIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightboxIndex]);

  const trackStyle: React.CSSProperties = {
    width: `${n * 100}%`,
    transform: `translateX(-${(current * 100) / n}%)`,
  };

  const lightboxSlide =
    lightboxIndex !== null ? SLIDES[lightboxIndex] : null;

  return (
    <section className="hero-promo" aria-label="Destacados">
      <div className="hero-promo__shell">
        <div className="hero-promo__viewport">
          <div className="hero-promo__track" style={trackStyle}>
            {SLIDES.map((item, idx) => {
              const active = current === idx;
              return (
                <article
                  key={item.id}
                  className="hero-promo__slide"
                  style={{ width: `${100 / n}%` }}
                  aria-hidden={!active}
                  {...(!active ? { inert: true } : {})}
                >
                  <div className="hero-promo__content">
                    <button
                      type="button"
                      className="hero-promo__media"
                      onClick={() => openLightbox(idx)}
                      aria-label={`Ver imagen completa: ${item.title}`}
                      tabIndex={active ? undefined : -1}
                    >
                      <Image
                        src={`${basePath}${item.image}`}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 92vw, 320px"
                        className="hero-promo__image"
                        priority={idx === 0}
                      />
                      <span className="hero-promo__media-hint" aria-hidden="true">
                        <span className="hero-promo__media-hint-icon">⤢</span>
                        Ver completa
                      </span>
                    </button>

                    <div className="hero-promo__body">
                      <div className="hero-promo__text">
                        <h1 className="section-title hero-promo__title">
                          {item.title}
                        </h1>
                        <p className="hero-subtitle hero-promo__subtitle">
                          {item.subtitle}
                        </p>
                        <p className="hero-promo__description">
                          {item.description}
                        </p>
                      </div>

                      <Link
                        href={item.link}
                        className="hero-promo__cta cta"
                        tabIndex={active ? undefined : -1}
                      >
                        Llevame ahí
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

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
            {SLIDES.map((item, dotIdx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrent(dotIdx)}
                aria-label={`Slide ${dotIdx + 1}: ${item.title}`}
                aria-current={current === dotIdx ? 'true' : undefined}
                className={
                  current === dotIdx
                    ? 'hero-slider-dot hero-slider-dot--active'
                    : 'hero-slider-dot'
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
      </div>

      {lightboxSlide ? (
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
              <Image
                src={`${basePath}${lightboxSlide.image}`}
                alt={lightboxSlide.title}
                width={lightboxSlide.width}
                height={lightboxSlide.height}
                sizes="(max-width: 768px) 96vw, 640px"
                className="hero-promo-lightbox__image"
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
