"use client";

import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";

export function HeaderAuth() {
  const { isSignedIn } = useAuth();

  return (
    <span className="header-auth">
      {!isSignedIn ? (
        <SignInButton mode="modal" forceRedirectUrl="/">
          <button
            type="button"
            className="nav-auth-trigger"
            style={{
              background: "#b7e0c6",
              color: "#1f4d36",
              border: "2px solid #6fad86",
              minHeight: "3rem",
              padding: "0.75rem 1.6rem",
              fontSize: "1.1rem",
              fontWeight: 800,
            }}
          >
            Entrar
          </button>
        </SignInButton>
      ) : (
        <UserButton
          appearance={{
            elements: {
              avatarBox: { width: 40, height: 40 },
            },
          }}
        />
      )}
    </span>
  );
}
