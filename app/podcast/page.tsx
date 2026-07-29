import type { Metadata } from "next";
import { Comments } from "../components/comments";
import { SiteFooter, SiteHeader } from "../components/site-shell";
import { buildPageMetadata } from "@/lib/site-metadata";

const SPOTIFY_SHOW_URL =
  "https://open.spotify.com/show/50vq8Q2v37mFSisdaqYNQ7";
const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@SaravaGente";

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    title: "Saravá Podcast",
    description:
      "Episodios con entrevistas, historias y voces locales en Spotify y YouTube. Escuchá todos los programas del podcast comunitario Saravá.",
    path: "/podcast",
  });
}

export default function PodcastPage() {
  return (
    <div className="page">
      <SiteHeader title="Espacio Cultural Sarava" />

      <main>
        <section className="section">
          <h2 className="section-title">Saravá Podcast</h2>
          <p className="hero-subtitle">
            Escuchá todos los episodios y novedades en Spotify o en nuestro
            canal de YouTube.
          </p>
          <div className="list">
            <article className="list-item live-card live-card-podcast">
              <div className="cta-stack">
                <a
                  className="cta cta-large cta-with-icon"
                  href={SPOTIFY_SHOW_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Abrir el podcast Saravá en Spotify"
                >
                  <svg
                    className="cta-platform-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
                    />
                  </svg>
                  Escuchar en Spotify
                </a>
                <a
                  className="cta cta-large cta-with-icon"
                  href={YOUTUBE_CHANNEL_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Abrir el canal de YouTube Saravá Gente"
                >
                  <svg
                    className="cta-platform-icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8ZM9.75 8.5v7L16 12l-6.25-3.5Z"
                    />
                  </svg>
                  Ver en YouTube
                </a>
                <p className="hero-subtitle">
                  Entrevistas, historias y voces locales en nuestro show.
                </p>
              </div>
            </article>
          </div>

          <Comments pageKey="podcast" />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
