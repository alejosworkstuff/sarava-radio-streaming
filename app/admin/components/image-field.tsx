"use client";

import { useEffect, useId, useRef, useState } from "react";

type ImageFieldProps = {
  name: string;
  label: string;
  required?: boolean;
  /** Resolved URL of the image already saved (shown until a new file is chosen). */
  existingSrc?: string | null;
  existingCaption?: string;
  emptyHint?: string;
  accept?: string;
  /** Visual variant for preview framing. */
  variant?: "default" | "logo" | "portrait" | "cover";
};

export function ImageField({
  name,
  label,
  required = false,
  existingSrc,
  existingCaption = "Imagen actual",
  emptyHint,
  accept = "image/*",
  variant = "default",
}: ImageFieldProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    const input = inputRef.current;
    const form = input?.form;
    if (!form) return;

    const clearPreview = () => {
      setPreviewUrl((current) => {
        if (current) URL.revokeObjectURL(current);
        return null;
      });
      setFileName(null);
    };

    form.addEventListener("reset", clearPreview);
    return () => form.removeEventListener("reset", clearPreview);
  }, []);

  const savedSrc = existingSrc?.trim() || null;
  const displaySrc = previewUrl ?? savedSrc;

  return (
    <div className={`admin-image-field admin-image-field--${variant}`}>
      {displaySrc ? (
        <div className="admin-image-preview" aria-live="polite">
          {/* Local blob URLs + mixed remote/public paths — native img is simplest. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={displaySrc}
            alt={previewUrl ? "Vista previa de la imagen seleccionada" : existingCaption}
          />
          <p className="admin-item-meta">
            {previewUrl
              ? `Nueva selección${fileName ? `: ${fileName}` : ""}`
              : existingCaption}
          </p>
        </div>
      ) : emptyHint ? (
        <p className="admin-item-meta">{emptyHint}</p>
      ) : null}

      <label htmlFor={id}>
        {label}
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="file"
          accept={accept}
          required={required}
          onChange={(event) => {
            const file = event.target.files?.[0] ?? null;
            setPreviewUrl((current) => {
              if (current) URL.revokeObjectURL(current);
              return file ? URL.createObjectURL(file) : null;
            });
            setFileName(file?.name ?? null);
          }}
        />
      </label>
    </div>
  );
}
