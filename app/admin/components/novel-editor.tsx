"use client";

import { useEffect, useState } from "react";
import {
  createNovelAction,
  deleteNovelAction,
  updateNovelAction,
} from "@/app/actions/cms";
import { AdminForm, DeleteButton } from "./admin-form";

type NovelDraft = {
  title: string;
  description: string;
  active: boolean;
  published: boolean;
};

type NovelFormValues = {
  id?: string;
  title: string;
  description: string;
  coverImage?: string;
  pdfUrl?: string | null;
  active: boolean;
  published: boolean;
};

function draftKey(id?: string) {
  return id ? `sarava-novel-draft:${id}` : "sarava-novel-draft:new";
}

function readDraft(key: string): NovelDraft | null {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as NovelDraft;
  } catch {
    return null;
  }
}

function writeDraft(key: string, draft: NovelDraft) {
  window.localStorage.setItem(key, JSON.stringify(draft));
}

function clearDraft(key: string) {
  window.localStorage.removeItem(key);
}

type NovelEditorProps = {
  mode: "create" | "edit";
  initial: NovelFormValues;
};

export function NovelEditor({ mode, initial }: NovelEditorProps) {
  const key = draftKey(initial.id);
  const [ready, setReady] = useState(false);
  const [title, setTitle] = useState(initial.title);
  const [description, setDescription] = useState(initial.description);
  const [active, setActive] = useState(initial.active);
  const [published, setPublished] = useState(initial.published);

  useEffect(() => {
    // Defer so draft hydration is not a sync setState-in-effect (React Compiler lint).
    const id = window.setTimeout(() => {
      const draft = readDraft(key);
      // Restore draft only when working on unpublished content (or new form).
      if (draft && (!initial.published || mode === "create")) {
        setTitle(draft.title);
        setDescription(draft.description);
        setActive(draft.active);
        setPublished(draft.published);
      }
      setReady(true);
    }, 0);
    return () => window.clearTimeout(id);
  }, [key, initial.published, mode]);

  useEffect(() => {
    if (!ready) return;
    if (published && mode === "edit" && initial.published) {
      // Published edit: don't keep a stale draft.
      clearDraft(key);
      return;
    }
    writeDraft(key, { title, description, active, published });
  }, [
    ready,
    key,
    title,
    description,
    active,
    published,
    mode,
    initial.published,
  ]);

  const action =
    mode === "create" ? createNovelAction : updateNovelAction;

  const handleSuccess = () => {
    if (published) {
      clearDraft(key);
    }
    if (mode === "create") {
      clearDraft(draftKey());
    }
  };

  if (!ready) {
    return <p className="admin-item-meta">Cargando borrador…</p>;
  }

  return (
    <>
      {!published ? (
        <p className="admin-item-meta">
          Borrador guardado en este navegador (sobrevive al refresh mientras no
          esté publicada).
        </p>
      ) : null}
      <AdminForm
        action={action}
        submitLabel={mode === "create" ? "Crear novela" : "Guardar cambios"}
        resetOnSuccess={mode === "create"}
        onSuccess={handleSuccess}
      >
        {mode === "edit" && initial.id ? (
          <input type="hidden" name="id" value={initial.id} />
        ) : null}
        {mode === "edit" ? (
          <p className="admin-item-meta">id: {initial.id}</p>
        ) : null}
        <label>
          Título
          <input
            name="title"
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label>
          Descripción
          <textarea
            name="description"
            rows={6}
            required
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        {mode === "edit" && initial.coverImage ? (
          <p className="admin-item-meta">Tapa actual: {initial.coverImage}</p>
        ) : null}
        <label>
          {mode === "create" ? "Tapa" : "Reemplazar tapa"}
          <input
            name="coverImage"
            type="file"
            accept="image/*"
            required={mode === "create"}
          />
        </label>
        {mode === "edit" && initial.pdfUrl ? (
          <p className="admin-item-meta">
            PDF actual:{" "}
            <a href={initial.pdfUrl} target="_blank" rel="noreferrer">
              ver / descargar
            </a>
          </p>
        ) : null}
        <label>
          {mode === "edit" && initial.pdfUrl ? "Reemplazar PDF" : "PDF (opcional)"}
          <input name="pdf" type="file" accept="application/pdf,.pdf" />
        </label>
        {mode === "edit" && initial.pdfUrl ? (
          <label className="admin-check">
            <input name="removePdf" type="checkbox" />
            Quitar PDF actual
          </label>
        ) : null}
        <label className="admin-check">
          <input
            name="active"
            type="checkbox"
            checked={active}
            onChange={(event) => setActive(event.target.checked)}
          />
          Novela del mes (activa)
        </label>
        <label className="admin-check">
          <input
            name="published"
            type="checkbox"
            checked={published}
            onChange={(event) => setPublished(event.target.checked)}
          />
          Publicada
        </label>
      </AdminForm>
      {mode === "edit" && initial.id ? (
        <DeleteButton
          action={deleteNovelAction}
          id={initial.id}
          label="Eliminar novela"
        />
      ) : null}
    </>
  );
}
