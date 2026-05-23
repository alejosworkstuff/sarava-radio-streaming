# Sarava Project

Sarava is a Next.js content-focused site with static-export delivery.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- File-based content loader (`lib/content.ts`)
- Static export configuration (`next.config.ts`)

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Delivery

- CI workflow for lint + build: `.github/workflows/ci.yml`
- Suitable for static hosting targets (GitHub Pages, S3 + CloudFront, or Vercel static output)
