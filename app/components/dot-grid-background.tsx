"use client";

import { usePathname } from "next/navigation";
import DotGrid from "./DotGrid";

const HIDDEN_PREFIXES = ["/admin", "/sign-in", "/sign-up", "/after-sign-in"];

export function DotGridBackground() {
  const pathname = usePathname() || "/";
  const hidden = HIDDEN_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

  if (hidden) return null;

  return (
    <div className="dot-grid-background" aria-hidden="true">
      <DotGrid
        dotSize={4}
        gap={28}
        baseColor="#000000"
        activeColor="#000000"
        opacity={0.3}
        proximity={120}
        shockRadius={250}
        shockStrength={5}
        resistance={750}
        returnDuration={1.5}
      />
    </div>
  );
}
