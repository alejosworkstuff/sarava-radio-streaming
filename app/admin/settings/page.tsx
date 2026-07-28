import { updateSiteLogoAction } from "@/app/actions/cms";
import { AdminForm } from "../components/admin-form";
import { ImageField } from "../components/image-field";
import { ResetLogoButton } from "../components/reset-logo-button";
import { getLogoUrl } from "@/lib/content";
import { resolvePublicAssetSrc } from "@/lib/hero-slides";

export default async function AdminSettingsPage() {
  const logoUrl = await getLogoUrl();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const logoSrc = resolvePublicAssetSrc(logoUrl, basePath);
  const isCustom = logoUrl.startsWith("http");

  return (
    <div className="admin-page">
      <header className="admin-page-header">
        <p className="pill">Branding</p>
        <h1>Logo del sitio</h1>
        <p>
          Este logo se muestra en el encabezado de todas las páginas públicas.
          Si no subís uno nuevo, se usa el logo predeterminado.
        </p>
      </header>

      <section className="admin-panel">
        <AdminForm action={updateSiteLogoAction} submitLabel="Subir logo nuevo">
          <ImageField
            name="logo"
            label="Nueva imagen"
            required
            existingSrc={logoSrc}
            existingCaption={
              isCustom
                ? "Logo personalizado (Blob)"
                : "Logo predeterminado (/logo.jpg)"
            }
            variant="logo"
          />
        </AdminForm>

        {isCustom ? <ResetLogoButton /> : null}
      </section>
    </div>
  );
}
