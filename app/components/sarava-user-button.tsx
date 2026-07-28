"use client";

import { UserButton } from "@clerk/nextjs";

const appearance = {
  variables: {
    colorPrimary: "#b66b4e",
    colorText: "#241c1a",
    colorTextSecondary: "#5b4d46",
    colorBackground: "#fefbf3",
    colorInputBackground: "#fbf6f1",
    colorNeutral: "#5b4d46",
    borderRadius: "0.85rem",
  },
  elements: {
    avatarBox: { width: 40, height: 40 },
    userButtonPopoverCard: {
      border: "1px solid #ead8c9",
      boxShadow: "0 12px 32px rgba(36, 28, 26, 0.12)",
    },
    userButtonPopoverMain: {
      background: "#fefbf3",
    },
    userButtonPopoverActionButton: {
      color: "#241c1a",
    },
    userButtonPopoverActionButtonIcon: {
      color: "#8e4d36",
    },
    userButtonPopoverFooter: {
      background: "#fbf6f1",
    },
  },
} as const;

function AdminIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  );
}

type SaravaUserButtonProps = {
  /** Show "Admin" menu item — only pass true after server-side allowlist check. */
  showAdminLink?: boolean;
};

export function SaravaUserButton({ showAdminLink = false }: SaravaUserButtonProps) {
  return (
    <UserButton appearance={appearance}>
      {showAdminLink ? (
        <UserButton.MenuItems>
          <UserButton.Link
            label="Admin"
            labelIcon={<AdminIcon />}
            href="/admin"
          />
        </UserButton.MenuItems>
      ) : null}
    </UserButton>
  );
}
