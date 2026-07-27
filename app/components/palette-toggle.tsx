"use client";

import { useEffect, useState } from "react";
import {
  THEME_LOGO_PASTEL,
  THEME_STORAGE_KEY,
} from "@/lib/theme";

type PaletteToggleProps = {
  /** Only render interactive control when true (admin allowlist). */
  enabled: boolean;
};

function applyTheme(theme: string) {
  if (typeof document === "undefined") return;
  if (theme === THEME_LOGO_PASTEL) {
    document.documentElement.setAttribute("data-theme", THEME_LOGO_PASTEL);
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
}

export function PaletteToggle({ enabled }: PaletteToggleProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    const isPastel = stored === THEME_LOGO_PASTEL;
    setActive(isPastel);
    applyTheme(isPastel ? THEME_LOGO_PASTEL : "default");
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <button
      type="button"
      className={`palette-toggle${active ? " palette-toggle--active" : ""}`}
      aria-pressed={active}
      aria-label={
        active
          ? "Volver a la paleta original"
          : "Probar paleta pastel del logo"
      }
      title={
        active
          ? "Paleta pastel activa — clic para volver"
          : "Probar reversión pastel del logo"
      }
      onClick={() => {
        const next = !active;
        setActive(next);
        window.localStorage.setItem(
          THEME_STORAGE_KEY,
          next ? THEME_LOGO_PASTEL : "default",
        );
        applyTheme(next ? THEME_LOGO_PASTEL : "default");
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 3c-2.2 1.8-3.5 4.4-3.5 7.2 0 2.6 1.5 4.8 3.5 4.8s3.5-2.2 3.5-4.8C15.5 7.4 14.2 4.8 12 3Z"
          fill="currentColor"
          opacity="0.9"
        />
        <circle cx="6.5" cy="10" r="2.2" fill="currentColor" opacity="0.75" />
        <circle cx="17.5" cy="10" r="2.2" fill="currentColor" opacity="0.75" />
        <circle cx="8.2" cy="16.2" r="2" fill="currentColor" opacity="0.65" />
        <circle cx="15.8" cy="16.2" r="2" fill="currentColor" opacity="0.65" />
        <circle cx="12" cy="19.2" r="1.7" fill="currentColor" opacity="0.55" />
      </svg>
    </button>
  );
}
