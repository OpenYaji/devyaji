# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test runner is configured.

## Stack

- **Next.js 16.2.1** — App Router only (no Pages Router). Read `node_modules/next/dist/docs/` before writing any Next.js code; this version has breaking changes from older releases.
- **React 19.2.4** — Server Components by default; opt into Client Components with `"use client"`.
- **TypeScript 5** — strict mode, path alias `@/*` maps to the project root.
- **Tailwind CSS v4** — uses `@import "tailwindcss"` in `globals.css` (not `@tailwind` directives). No `tailwind.config.js`; theme tokens are declared inline via `@theme` in CSS.
- **ESLint 9** — flat config in `eslint.config.mjs`.

## Architecture

All routes live under `app/` using the App Router file conventions (`layout.tsx`, `page.tsx`, `loading.tsx`, etc.). There is currently only a root layout and home page — the project is freshly scaffolded and awaiting implementation.

Fonts are loaded via `next/font/google` in `app/layout.tsx` and exposed as CSS variables (`--font-geist-sans`, `--font-geist-mono`).

## Design System (DESIGN.md)

The portfolio targets a high-end editorial/cinematic aesthetic ("The Digital Curator"). Key constraints to enforce in all UI work:

- **No rounded corners** — `border-radius: 0` everywhere, no exceptions.
- **No 1px borders** for sectioning — use background color shifts between surface tiers instead.
- **Surface hierarchy** (darkest → lightest): `#0e0e0e` → `#131313` → `#1b1b1b` → `#1f1f1f` → `#2a2a2a` → `#353535`.
- **Accent color**: `#124af0` (electric blue) — use sparingly for interactive/focus states only.
- **Typography**: Inter only. Headlines are massive, bold, all-caps, tracking `-0.02em`. Labels are all-caps with `letter-spacing: 0.1rem`. No center-aligned body text.
- **Shadows**: avoid standard drop shadows; use tonal layering to imply elevation. If a shadow is needed: `0px 24px 48px rgba(0,0,0,0.5)`.
- **Spacing**: section gaps use `spacing-20`/`spacing-24`; aggressive negative space is intentional.
- **Grain overlay**: a global fixed `<div>` with a noise PNG at 3% opacity ties the visual layers together.
- **Buttons**: primary = solid `#003ace` bg, `#aebbff` text, all-caps bold. Secondary = ghost with `#8d909e` outline at 20% opacity.
- **Inputs**: bottom-border only (`#8d909e`); on focus transitions to `#124af0`.
