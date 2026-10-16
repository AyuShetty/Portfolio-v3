# Interactive Portfolio

A single-page, scroll-driven portfolio built as a sequence of distinct scenes: frame-sequence opening, identity collage, connected skill constellation, scroll-scrubbed project universe, narrative experience trail, and resolved contact close.

## Project structure

| Path | Purpose |
|---|---|
| `client/src/pages/Home.tsx` | Composes the scenes and owns each scene’s scroll-progress measurement. |
| `client/src/data/portfolio.ts` | The single source of truth for hero text, asset slots, identity cards, highlights, skill groups, projects, experience, and contact details. |
| `client/src/components/HeroSignalPortrait.tsx` | Original dependency-free interactive canvas portrait that forms the default hero visual. |
| `client/src/components/ScrollFrameSequence.tsx` | Reusable canvas frame sequence, kept ready for a future authored image/video sequence. |
| `client/src/components/ConstellationScene.tsx` | Lightweight connected-node visual that rotates based on scroll progress and supports node focus. |
| `client/src/components/ScrollGallery.tsx` | Reusable pinned project gallery driven by the `projects` data array. |
| `client/src/components/ProjectModal.tsx` | Full-screen case-study overlay. |
| `client/src/index.css` | Palette, scene layouts, responsive behavior, and reduced-motion rules. |

## Hero visual and optional frame sequence

The default opening visual is now **`HeroSignalPortrait`**, an original canvas illustration composed from geometric forms, orbit traces, a high-collar silhouette, and a chartreuse signal orb. It has no external asset dependency. Pointer movement creates a restrained parallax response, while the **Activate signal** control intensifies the orb and surrounding field. Reduced-motion visitors receive the same illustration without continuous motion.

If you later have a final character video, export it as an ordered image set named `0001.jpg` through `0120.jpg`, host the files, update `heroConfig.frames` with their public URLs, and set `heroConfig.frameSequenceReady` to `true`. The sequence will then overlay the original canvas portrait on capable screens, while compact and reduced-motion devices retain the lightweight authored portrait.

## Add, remove, or reorder projects

Each project is one object in the `projects` array inside `client/src/data/portfolio.ts`. The `ScrollGallery` derives its card order, numerical position, accent, badges, and case-study modal directly from that list.

To add a project, duplicate one object, give it a unique `id`, and complete its fields. To reorder, move the object in the array. To remove, delete the object. No layout code needs to be changed.

The project modal renders all requested case-study sections from the object fields: overview, problem, objectives, role, architecture, engineering challenges, process, features, implementation, future improvements, lessons, and related projects.

## Adjust scene lengths and pin ranges

Each scene controls its own scroll length; there is no global scroll-hijack dependency. Adjust the outer section height in `client/src/index.css` to change the scrub range while leaving the sticky viewport stable.

| Scene | CSS selector | Current duration | How to tune |
|---|---|---:|---|
| Frame-sequence opening | `.hero-scene` | `210vh` | Shorten for a sharper two-beat introduction; lengthen if your frame animation needs more breathing room. |
| Identity collage | `.identity-scene` | `155vh` minimum | Adjust the section height or individual card placement. |
| Skills constellation | `.skills-scene` | `190vh` minimum | Increase the height for a slower field rotation. |
| Project universe | `.universe-scene` | `900vh` | One project slot is roughly one viewport. Change with the total number of project objects. |
| Experience trail | `.timeline-scene` | `160vh` minimum | Increase for more room between role cards. |

## Content and asset replacements

All final placeholder content lives in `client/src/data/portfolio.ts`.

- Replace `YOUR NAME`, the hero title, and tagline in `heroConfig`.
- Replace the collage placeholder cards with your image URLs and add image rendering within the identity-card markup when photography is ready.
- Replace `hello@yourdomain.com` in `contactConfig` with the final email address.
- Replace `client/public/resume-placeholder.txt` with a small final resume file. For a PDF, set `resumePath` to `/resume.pdf` and add the final file to `client/public/`.
- Expand the copy in each project object as final case studies become available.

## Interaction and performance notes

The implementation favors independent per-scene scroll calculations using passive listeners and sticky sections. The new hero reacts to pointer position and exposes a keyboard-accessible signal toggle. Identity collage cards now select a live caption, and constellation nodes can be focused by pointer, click, or keyboard to brighten their connected metric paths. The site also contains a clear `prefers-reduced-motion` treatment, a simpler 2D constellation mode on small screens, and a naturally vertical contact close.

The original build brief recommended Lenis, GSAP ScrollTrigger, and React Three Fiber. The recovered static scaffold’s package installation could not complete because its package registry was temporarily unavailable, so this implementation uses dependency-free canvas/CSS versions for the frame fallback and constellation in order to remain usable. When packages are available, `ScrollFrameSequence` and `ConstellationScene` are intentionally isolated components and can be upgraded independently to use a Lenis/GSAP controller and R3F WebGL scene without changing the content data or page structure.
