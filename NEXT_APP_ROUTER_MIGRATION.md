# Migrating This Portfolio from Vite to Next.js App Router

This guide moves the delivered portfolio into a **Next.js App Router** project without changing its scene architecture. The essential strategy is to preserve the current reusable scene components and central data file, while replacing Vite’s entry point and Wouter routing with `app/layout.tsx` and `app/page.tsx`.

> **Recommended migration boundary:** Treat the whole animated portfolio as one Client Component, but keep `app/layout.tsx`, `app/page.tsx`, metadata, static assets, and any future APIs on the server side. This contains browser-only code such as `window`, `document`, `ResizeObserver`, canvas drawing, and scroll listeners.

## 1. Create a clean Next.js App Router target

Create the target from a clean folder rather than converting the existing Vite configuration in place. This avoids retaining Vite-only plugins, server shims, and routing dependencies.

```bash
pnpm create next-app@latest interactive-portfolio-next
cd interactive-portfolio-next
```

Choose the recommended TypeScript, Tailwind CSS, ESLint, and **App Router** defaults. The current Next.js documentation states that the standard initializer enables TypeScript, Tailwind, App Router, and an `@/*` import alias by default. [1]

Then add the packages that this portfolio already uses:

```bash
pnpm add lucide-react framer-motion
# Add these when you upgrade the constellation to real WebGL / R3F:
pnpm add three @react-three/fiber @react-three/drei gsap lenis
```

Use the following scripts in the new `package.json` if the initializer did not produce them:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  }
}
```

## 2. Move files into the App Router shape

The portfolio does not need Wouter or a client-side router because the whole experience lives at `/`. In App Router, directories define route segments and a URL becomes public when its segment contains a `page.tsx` or `route.ts` file. [2]

| Current Vite path | Next.js App Router destination | Migration action |
|---|---|---|
| `client/src/pages/Home.tsx` | `src/components/portfolio/PortfolioExperience.tsx` | Move, rename, add `'use client'` as the first statement. |
| `client/src/components/*.tsx` | `src/components/portfolio/*.tsx` | Move the four portfolio components. Add `'use client'` to each component that uses effects, state, canvas, `window`, or `document`. |
| `client/src/data/portfolio.ts` | `src/data/portfolio.ts` | Move unchanged. Keep it framework-neutral and typed. |
| `client/src/index.css` | `src/app/globals.css` | Move theme tokens and scene CSS. Update Tailwind’s first import as shown below. |
| `client/public/resume-placeholder.txt` | `public/resume-placeholder.txt` | Move unchanged. Replace with `/resume.pdf` later. |
| `client/index.html` | `src/app/layout.tsx` | Do not copy directly. Move document language, fonts, and metadata into the root layout. |
| `client/src/main.tsx` | `src/app/page.tsx` | Replace with the small App Router page below. |
| `client/src/App.tsx` | — | Delete. `layout.tsx` replaces the app shell; `page.tsx` replaces the root route. |
| `client/src/pages/NotFound.tsx` | `src/app/not-found.tsx` (optional) | Rebuild only if you later add public routes. |
| `vite.config.ts`, `server/`, `shared/` | — | Do not copy. Recreate only genuinely needed server capabilities using Next route handlers. |

A clean target structure should look like this:

```text
interactive-portfolio-next/
├── public/
│   └── resume-placeholder.txt
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   └── portfolio/
│   │       ├── ConstellationScene.tsx
│   │       ├── PortfolioExperience.tsx
│   │       ├── ProjectModal.tsx
│   │       ├── ScrollFrameSequence.tsx
│   │       └── ScrollGallery.tsx
│   └── data/
│       └── portfolio.ts
├── next.config.ts
└── tsconfig.json
```

## 3. Add the App Router entry files

The root layout is required by the App Router and owns the `<html>` and `<body>` elements. [1]

### `src/app/layout.tsx`

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Your Name — Product Engineer",
  description: "A scene-based portfolio for product engineering, systems, and interaction.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### `src/app/page.tsx`

Keep this route server-rendered. It can render the interactive portfolio as a child Client Component.

```tsx
import { PortfolioExperience } from "@/components/portfolio/PortfolioExperience";

export default function HomePage() {
  return <PortfolioExperience />;
}
```

### `src/components/portfolio/PortfolioExperience.tsx`

This is the renamed current `Home.tsx`. Add this exact directive as line one:

```tsx
"use client";
```

Leave the existing imports and scene composition in place. Rename the component export from `Home` to `PortfolioExperience`:

```tsx
"use client";

export function PortfolioExperience() {
  // Existing state, refs, scroll progress hook, and JSX.
}
```

## 4. Mark the correct components as Client Components

The following current components use browser APIs or React hooks and must begin with `'use client';`:

| Component | Why it must be client-side |
|---|---|
| `PortfolioExperience.tsx` | Uses `useEffect`, `useRef`, `useState`, `window`, `FormData`, and `window.location`. |
| `ScrollFrameSequence.tsx` | Uses canvas, `Image`, `ResizeObserver`, `window.matchMedia`, and effects. |
| `ConstellationScene.tsx` | Uses canvas, `ResizeObserver`, `window.matchMedia`, and effects. |
| `ScrollGallery.tsx` | Reads scroll position and opens the client-side modal. |
| `ProjectModal.tsx` | Focuses a button, listens for Escape, and locks `document.body` scrolling. |

`src/data/portfolio.ts` remains a plain TypeScript module; it needs no directive and should not import browser-only code.

## 5. Preserve aliases and Tailwind CSS

Next.js supports `baseUrl` and `paths` in `tsconfig.json`, so the existing `@/…` imports can remain unchanged. [1] Confirm the target contains this mapping:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

For Tailwind CSS 4, begin `src/app/globals.css` with the Tailwind import, then keep the existing visual tokens and scene CSS below it:

```css
@import "tailwindcss";
@import "tw-animate-css";

/* Paste the existing :root tokens and portfolio scene rules below. */
```

The portfolio is primarily custom CSS, so no component-level styling rewrite should be necessary. Remove Vite-only Tailwind configuration and Vite imports; the Next target’s generated PostCSS/Tailwind setup will own the CSS pipeline.

## 6. Keep heavy visuals isolated and lazy-load future WebGL

The current canvas fallback is safe as a Client Component. When you restore the intended React Three Fiber constellation, load that 3D component dynamically from within a Client Component:

```tsx
"use client";

import dynamic from "next/dynamic";

const R3FConstellation = dynamic(
  () => import("./R3FConstellation").then((module) => module.R3FConstellation),
  {
    ssr: false,
    loading: () => <div className="constellation constellation--loading" />,
  },
);
```

`ssr: false` must be declared inside a Client Component. Next.js documents that dynamic imports defer Client Components and their libraries, and that the `ssr: false` option is not permitted from a Server Component. [3]

Apply the same pattern to any future large WebGL, video-processing, or frame-preloading subsystem. Keep the hero’s `frameSequenceReady` guard: only set it to `true` after the real frames are hosted and the `frames` array has public URLs.

## 7. Handle static media and the contact form

Use the root `public/` directory only for small static assets such as the resume, favicon, and lightweight placeholders. Files in `public/` are served from `/`, so `public/resume.pdf` is addressed as `/resume.pdf`. [1]

For the final hero sequence and photography, use object storage/CDN URLs rather than putting hundreds of large frames inside the repository. Preserve the current `heroConfig.frames` array structure and replace its placeholder paths with those URLs.

The current contact form deliberately creates a `mailto:` link. If you want an actual server-side form, create a route handler at `src/app/api/contact/route.ts`, then replace the `window.location.href` block with a `fetch("/api/contact", { method: "POST", ... })` call. Keep API keys in `.env.local`, never in `portfolio.ts` or a Client Component.

## 8. Retire Vite-specific code

After the Next target starts correctly, delete or do not migrate the following:

```text
client/index.html
client/src/main.tsx
client/src/App.tsx
vite.config.ts
server/
shared/
Vite-only scripts, Vite plugins, vite-plugin-manus-runtime
wouter and the Vite theme/router plumbing, if used only by the starter
```

Do not directly carry over the Vite debug collector or storage proxy. Recreate only needed functionality in a Next route handler, middleware/proxy, or platform integration after deciding its production purpose.

## 9. Verification sequence

Run the migration in this order:

```bash
pnpm dev
pnpm lint
pnpm build
pnpm start
```

Then verify the following manually in a browser:

| Area | Acceptance check |
|---|---|
| Root route | `/` renders every scene without hydration warnings. |
| Frame hero | Fallback works while `frameSequenceReady` is false; real frames render when enabled. |
| Scroll gallery | All nine projects appear, the active card transitions correctly, and the modal opens/closes with Escape. |
| Reduced motion | System reduced-motion preference removes nonessential movement and keeps content readable. |
| Mobile | Hero fallback remains light, constellation labels stay legible, and the gallery cards fit one viewport. |
| Contact | Resume downloads from `/resume.pdf` and form behavior is intentional. |
| Production build | `pnpm build` finishes successfully before deployment. |

## Recommended commit sequence

Keep the migration easy to review by separating concerns:

1. Create the default Next.js App Router project.
2. Move static assets, data, components, and CSS without behavior changes.
3. Add Client Component directives and replace the Vite entry point with `layout.tsx` and `page.tsx`.
4. Remove Wouter, Vite files, and unused starter plumbing.
5. Add dynamic loading for the future R3F scene and an API contact route only after the base build passes.

## References

[1] [Next.js — Installation and App Router setup](https://nextjs.org/docs/app/getting-started/installation)

[2] [Next.js — Project structure and route conventions](https://nextjs.org/docs/app/getting-started/project-structure)

[3] [Next.js — Lazy loading Client Components and libraries](https://nextjs.org/docs/app/guides/lazy-loading)
