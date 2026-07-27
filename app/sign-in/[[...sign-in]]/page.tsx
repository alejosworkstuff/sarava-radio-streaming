import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="admin-auth">
      <div className="admin-auth-card">
        <p className="pill">Espacio Cultural Saravá</p>
        <h1 className="admin-auth-title">Ingresar</h1>
        <p className="admin-auth-copy">
          Iniciá sesión para comentar publicaciones y la novela del mes. El
          equipo de gestión usa la misma puerta para entrar al panel admin.
        </p>
        <SignIn
          routing="path"
          path="/sign-in"
          fallbackRedirectUrl="/"
          signUpUrl="/sign-up"
        />
      </div>
    </main>
  );
}
