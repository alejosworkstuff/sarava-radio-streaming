'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SLIDES = [
  {
    id: 'novel',
    title: 'Las indignas',
    subtitle: 'Novela del Mes',
    description: 'En un mundo arrasado por catástrofes y contaminación, un grupo de mujeres habita la Casa de la Hermandad Sagrada, aislada del resto de la humanidad.',
    image: '/club-lectura-las-indignas.png',
    link: '/club-lectura',
  },
  {
    id: 'podcast',
    title: 'Podcast Saravá',
    subtitle: 'Sintoniza nuestras historias.',
    description: 'Nuevos episodios todos los martes sobre arte, política y cultura local.',
    image: '/foto-1.jpg',
    link: '/podcast',
  },
  {
    id: 'streaming',
    title: 'Streaming en Vivo',
    subtitle: 'Participa de nuestros encuentros.',
    description: 'Talleres y debates en vivo desde nuestro centro cultural.',
    image: '/foto-2.jpg',
    link: '/radio-streaming',
  }
];

export default function HeroBanner() {
  const [current, setCurrent] = React.useState(0);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const nextSlide = () => setCurrent((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <section className="hero-section">
      <div className="container">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow)]">
          <div className="book-feature">

            {/* Image */}
            <div className="book-cover flex items-center justify-center" style={{ minHeight: '320px' }}>
              <Image
                src={`${basePath}${SLIDES[current].image}`}
                alt={SLIDES[current].title}
                width={442}
                height={442}
                className="rounded-[24px] border-4 border-white/80 bg-gradient-to-br from-white/95 to-neutral-100/90 mx-auto block object-cover"
                style={{ width: '442px', height: '442px' }}
                priority
              />
            </div>

            {/* Copy */}
            <div className="book-copy">
              <div className="post-excerpt">
                <h1 className="section-title mb-3">
                  {SLIDES[current].title}
                </h1>
                <h2 className="hero-subtitle italic mb-4 text-muted">
                  {SLIDES[current].subtitle}
                </h2>
                <p className="hero-description mb-6">
                  {SLIDES[current].description}
                </p>
              </div>

              <div className="hero-actions flex gap-4 mt-6 justify-center lg:justify-start">
                <Link
                  href={SLIDES[current].link}
                  className="cta bg-accent text-white rounded-full font-semibold hover:bg-accent-strong transition-all"
                  style={{ padding: '12px 24px', display: 'inline-block', whiteSpace: 'nowrap' }}
                >
                  Llevame ahí
                </Link>
              </div>

              {/* Slider Controls */}
              <div className="slider-controls mt-12 flex items-center justify-center lg:justify-start gap-4 flex-wrap">
                <button
                  onClick={prevSlide}
                  className="pill nav-btn bg-card border-border hover:bg-accent hover:text-white px-4 py-2 rounded-xl font-medium transition-all"
                  aria-label="Anterior"
                >
                  ← Anterior
                </button>
                <div className="slider-dots flex items-center gap-2">
                  {SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrent(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      className={`w-3 h-3 rounded-full transition-all ${
                        current === idx
                          ? 'w-12 h-3 bg-gradient-to-r from-accent to-accent-strong shadow-glow'
                          : 'bg-border/50 hover:bg-accent/60'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextSlide}
                  className="pill nav-btn bg-card border-border hover:bg-accent hover:text-white px-4 py-2 rounded-xl font-medium transition-all"
                  aria-label="Siguiente"
                >
                  Siguiente →
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
