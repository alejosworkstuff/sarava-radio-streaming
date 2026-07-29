import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="admin-auth">
      <div className="admin-auth-card">
        <p className="pill">Espacio Cultural Saravá</p>
        <h1 className="admin-auth-title">Ingresar</h1>
        <p className="admin-auth-copy">
          Iniciá sesión para comentar o para entrar al panel de gestión.
        </p>
        <SignIn
          routing="path"
          path="/sign-in"
          fallbackRedirectUrl="/after-sign-in"
          forceRedirectUrl="/after-sign-in"
          signUpUrl="/sign-up"
        />
      </div>
    </main>
  );
}
