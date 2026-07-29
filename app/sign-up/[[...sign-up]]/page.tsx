import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="admin-auth">
      <div className="admin-auth-card">
        <p className="pill">Espacio Cultural Saravá</p>
        <h1 className="admin-auth-title">Crear cuenta</h1>
        <p className="admin-auth-copy">
          Registrate para dejar comentarios en las publicaciones y en la novela
          destacada del club de lectura.
        </p>
        <SignUp
          routing="path"
          path="/sign-up"
          fallbackRedirectUrl="/after-sign-in"
          forceRedirectUrl="/after-sign-in"
          signInUrl="/sign-in"
        />
      </div>
    </main>
  );
}
