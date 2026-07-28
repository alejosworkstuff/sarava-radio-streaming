import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter, SiteHeader } from "../components/site-shell";
import { getFeaturedEvent } from "../../lib/content";
import { buildPageMetadata } from "@/lib/site-metadata";

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    title: "Radio streaming",
    description:
      "Escuchá la transmisión en vivo de Saravá y enterate de próximos horarios. Programa de radio comunitaria con historias reales y cercanas.",
    path: "/radio-streaming",
  });
}

export default async function RadioStreamingPage() {
  const event = await getFeaturedEvent("radio");
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <div className="page">
      <SiteHeader title="Espacio Cultural Sarava" />

      <main>
        <section className="section">
          <h2 className="section-title">Streaming en vivo</h2>
          <p className="hero-subtitle">
            Espacio para escuchar la transmisión en tiempo real y enterarte de
            próximos horarios.
          </p>
          <div className="list">
            <article className="list-item live-card">
              <div className="live-card-mark" aria-hidden="true">
                <Image
                  src={`${basePath}/medium-logo.jpeg`}
                  alt=""
                  width={160}
                  height={160}
                  className="live-card-mark-img"
                  priority
                />
              </div>
              <div className="cta-stack">
                <a
                  className="cta cta-large"
                  href={event?.ctaHref ?? "https://www.youtube.com/@medium995"}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Abrir transmisión en vivo en YouTube"
                >
                  {event?.ctaLabel ?? "Miranos en directo"}
                </a>
                <p className="hero-subtitle">
                  {event?.schedule ?? "Horario habitual: jueves 19:00 a 21:00."}
                </p>
                {event?.summary ? (
                  <p className="hero-subtitle">{event.summary}</p>
                ) : null}
              </div>
              <div className="live-card-mark" aria-hidden="true">
                <svg
                  className="live-card-mark-img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#FF0000"
                    d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8Z"
                  />
                  <path fill="#fff" d="M9.75 15.5v-7L16 12l-6.25 3.5Z" />
                </svg>
              </div>
            </article>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
