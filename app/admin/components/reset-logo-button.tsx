"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { resetSiteLogoAction } from "@/app/actions/cms";

export function ResetLogoButton() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <button
        type="button"
        className="admin-btn admin-btn-danger"
        disabled={pending}
        onClick={() => {
          if (!window.confirm("¿Restaurar el logo predeterminado?")) return;
          setError(null);
          startTransition(async () => {
            const result = await resetSiteLogoAction();
            if (!result.ok) {
              setError(result.error);
              return;
            }
            router.refresh();
          });
        }}
      >
        {pending ? "…" : "Restaurar logo predeterminado"}
      </button>
      {error ? (
        <p className="admin-form-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
