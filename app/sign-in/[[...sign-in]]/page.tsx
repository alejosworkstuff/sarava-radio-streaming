import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="admin-auth">
      <div className="admin-auth-card">
        <p className="pill">Espacio Cultural Saravá</p>
        <h1 className="admin-auth-title">Panel de gestión</h1>
        <p className="admin-auth-copy">
          Ingresá con la cuenta compartida del espacio para publicar y editar
          contenido.
        </p>
        <SignIn
          routing="path"
          path="/sign-in"
          fallbackRedirectUrl="/admin"
          signUpUrl="/sign-in"
        />
      </div>
    </main>
  );
}
