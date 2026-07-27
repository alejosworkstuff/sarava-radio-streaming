"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { ActionResult } from "@/app/actions/cms";

type AdminFormProps = {
  action: (formData: FormData) => Promise<ActionResult>;
  children: React.ReactNode;
  submitLabel: string;
  className?: string;
  resetOnSuccess?: boolean;
  onSuccess?: () => void;
};

export function AdminForm({
  action,
  children,
  submitLabel,
  className,
  resetOnSuccess = false,
  onSuccess,
}: AdminFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <form
      className={className ?? "admin-form"}
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        setError(null);
        setMessage(null);
        startTransition(async () => {
          const result = await action(formData);
          if (!result.ok) {
            setError(result.error);
            return;
          }
          setMessage(result.message ?? "Guardado");
          if (resetOnSuccess) form.reset();
          onSuccess?.();
          router.refresh();
        });
      }}
    >
      {children}
      {error ? (
        <p className="admin-form-error" role="alert">
          {error}
        </p>
      ) : null}
      {message ? <p className="admin-form-ok">{message}</p> : null}
      <button className="admin-btn" type="submit" disabled={pending}>
        {pending ? "Guardando…" : submitLabel}
      </button>
    </form>
  );
}

type DeleteButtonProps = {
  action: (formData: FormData) => Promise<ActionResult>;
  id: string;
  label?: string;
};

export function DeleteButton({
  action,
  id,
  label = "Eliminar",
}: DeleteButtonProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!window.confirm("¿Seguro que querés eliminar esto?")) return;
        const formData = new FormData(event.currentTarget);
        setError(null);
        startTransition(async () => {
          const result = await action(formData);
          if (!result.ok) {
            setError(result.error);
            return;
          }
          router.refresh();
        });
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button className="admin-btn admin-btn-danger" type="submit" disabled={pending}>
        {pending ? "…" : label}
      </button>
      {error ? (
        <p className="admin-form-error" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
