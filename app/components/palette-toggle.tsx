"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import {
  THEME_DEFAULT,
  THEME_LILAC_GREEN,
  THEME_LOGO_PASTEL,
  THEME_STORAGE_KEY,
  THEMES,
  isSaravaTheme,
  type SaravaTheme,
} from "@/lib/theme";

type PaletteToggleProps = {
  /** Only render interactive control when true (admin allowlist). */
  enabled: boolean;
};

const listeners = new Set<() => void>();

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY || event.key === null) {
      onStoreChange();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStorage);
  };
}

function readStoredTheme(): SaravaTheme {
  const value = window.localStorage.getItem(THEME_STORAGE_KEY);
  return isSaravaTheme(value) ? value : THEME_DEFAULT;
}

function getServerSnapshot(): SaravaTheme {
  return THEME_DEFAULT;
}

function applyTheme(theme: SaravaTheme) {
  if (typeof document === "undefined") return;
  if (theme === THEME_DEFAULT) {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", theme);
  }
}

function setTheme(theme: SaravaTheme) {
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  applyTheme(theme);
  listeners.forEach((listener) => listener());
}

const SWATCHES: Record<SaravaTheme, string[]> = {
  [THEME_DEFAULT]: ["#fbf6f1", "#b66b4e", "#8e4d36"],
  [THEME_LOGO_PASTEL]: ["#eef7f4", "#e8a0b8", "#6eb8c9"],
  [THEME_LILAC_GREEN]: ["#f3f0f8", "#9b7bb8", "#6b9e4a"],
};

export function PaletteToggle({ enabled }: PaletteToggleProps) {
  const theme = useSyncExternalStore(subscribe, readStoredTheme, getServerSnapshot);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!enabled) {
    return null;
  }

  const activeLabel =
    THEMES.find((entry) => entry.id === theme)?.label ?? "Original";

  return (
    <div className="palette-picker" ref={rootRef}>
      <button
        type="button"
        className={`palette-toggle${open || theme !== THEME_DEFAULT ? " palette-toggle--active" : ""}`}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={menuId}
        aria-label={`Elegir paleta de colores. Actual: ${activeLabel}`}
        title={`Paleta: ${activeLabel}`}
        onClick={() => setOpen((value) => !value)}
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

      {open ? (
        <div
          className="palette-menu"
          id={menuId}
          role="listbox"
          aria-label="Paletas de color"
        >
          {THEMES.map((entry) => {
            const selected = entry.id === theme;
            return (
              <button
                key={entry.id}
                type="button"
                role="option"
                aria-selected={selected}
                className={`palette-option${selected ? " palette-option--selected" : ""}`}
                onClick={() => {
                  setTheme(entry.id);
                  setOpen(false);
                }}
              >
                <span
                  className="palette-option-swatch"
                  aria-hidden="true"
                  style={{
                    background: `linear-gradient(135deg, ${SWATCHES[entry.id].join(", ")})`,
                  }}
                />
                <span className="palette-option-copy">
                  <span className="palette-option-label">{entry.label}</span>
                  <span className="palette-option-desc">{entry.description}</span>
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
