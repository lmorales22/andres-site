# TOTTEM Arquitectura — Design Brief & Build Prompt
**For: Claude Code / Codex**
**Project:** Portfolio website for Tottem Arquitectura, Medellín, Colombia
**Tech stack:** Pure HTML5 + CSS3 + Vanilla JS. No frameworks. Single `index.html` with embedded `style.css` and `main.js`. Must deploy to GitHub Pages or Netlify with zero build steps.

---

## Guiding Principle
This is not a corporate website. It is a gallery. The architecture is the product — the site exists to showcase it without apology or decoration. Every design decision must serve the work. When in doubt, remove.

**Reference aesthetic:** Wallpaper* magazine, Dezeen portfolio pages, Studio Gang website. Confident. Editorial. Quiet.

---

## File structure
```
andres-site/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
└── images/
    └── (all .jpg files already present — do not rename or move)
```

---

## Color System
```
--color-bg:         #0D0D0D    /* near-black, the canvas */
--color-surface:    #141414    /* cards, elevated surfaces */
--color-text:       #F5F0E8    /* warm off-white, main text */
--color-text-muted: #8A8580    /* secondary text, captions */
--color-accent:     #3D8ECC    /* pool blue, used SPARINGLY — only on hover states and links */
--color-border:     #2A2A2A    /* subtle dividers */
```

---

## Typography
Load from Google Fonts (self-host if possible, otherwise CDN):
- `Cormorant Garant` — weights 300, 400, 600 (headings, display, manifesto)
- `Inter` — weights 300, 400 (body, nav, captions)

Rules:
- H1 (hero): Cormorant Garant, 300 weight, tracking 0.08em, uppercase, 5–7vw
- H2 (section headings): Cormorant Garant, 400 weight, 2.5rem
- Body: Inter, 300 weight, 1rem, line-height 1.75
- Captions: Inter, 300 weight, 0.75rem, uppercase, tracking 0.12em, color `--color-text-muted`
- NO bold text in body copy. Only headings use weight changes.

---

## Sections (in order)

### 1. NAVIGATION
- Fixed top, full-width, transparent over hero, transitions to `rgba(13,13,13,0.95)` with `backdrop-filter: blur(8px)` on scroll past 80px
- Left: "TOTTEM" in Cormorant Garant 400, 1.1rem, letter-spacing 0.3em
- Right: four links — "Proyectos" "Filosofía" "Estudio" "Contacto" — Inter 300, 0.8rem, tracking 0.15em, uppercase
- On mobile: hamburger icon opens full-screen overlay menu
- Nav links: on hover, color transitions to `--color-accent` over 200ms

### 2. HERO
- Full viewport height (100vh), zero margin, zero padding
- **Background image: `images/behance_161726219_01.jpg`** (infinity pool + mountains)
- `background-size: cover`, `background-position: center 40%`
- Overlay: `linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 100%)`
- Center content (both axes):
  - Studio wordmark: "TOTTEM" in Cormorant Garant 300, 6vw, tracking 0.4em, uppercase, color #F5F0E8
  - Thin horizontal rule (1px, 60px wide, color #F5F0E8 at 40% opacity), centered below wordmark, margin 24px vertical
  - Subline: "Arquitectura · Medellín" in Inter 300, 0.85rem, tracking 0.25em, uppercase, color rgba(245,240,232,0.7)
- Bottom-left corner (absolute): scroll indicator — a small vertical line (1px × 40px, white 50%) with "scroll" in Inter 300, 0.65rem, tracking 0.2em, rotated 90°, color rgba(255,255,255,0.4)
- Subtle parallax on hero image: on scroll, `background-position-y` shifts at 40% of scroll speed

### 3. MANIFESTO
- Section padding: 120px 8vw
- Background: `--color-bg`
- Layout: centered, max-width 800px, margin 0 auto
- Quote text: "Lo simple, lo práctico, el minimalismo." — Cormorant Garant 300, 2.8rem, line-height 1.3, color `--color-text`, centered
- Below quote, 40px gap:
- Sub-text (2–3 sentences): "En Tottem, el diseño parte del lugar — de la luz que entra por la ventana, de los materiales que nacen del suelo. Cada proyecto es una conversación entre el espacio y quien lo habita." — Inter 300, 1rem, color `--color-text-muted`, centered, max-width 540px, margin 0 auto
- Fade-in animation triggered when section enters viewport (IntersectionObserver, threshold 0.3, translateY(30px) → translateY(0), opacity 0→1, duration 800ms ease)

### 4. PROJECTS GRID
- Section padding: 80px 5vw
- Section label: "PROYECTOS" in Inter 300, 0.7rem, tracking 0.3em, uppercase, color `--color-text-muted`, margin-bottom 48px
- Layout: CSS Grid, asymmetric
  - Row 1: 2 columns, ratio 1.4fr 1fr (images: `behance_161726219_01.jpg`, `behance_157821753_01.jpg`)
  - Row 2: 3 columns, ratio 1fr 1fr 1fr (images: `behance_161710953_01.jpg`, `behance_161730713_05.jpg`, `behance_161730713_09.jpg`)
  - Row 3: 2 columns, ratio 1fr 1.4fr (images: `behance_157808365_01.jpg`, `behance_161730713_01.jpg`)
  - Row 4: 2 columns, ratio 1fr 1fr (images: `behance_161710953_05.jpg`, `behance_161723547_01.jpg`)
  - Gap between cells: 3px
- Each project card:
  - `aspect-ratio` set per row: row1/3 = 16/10, row2 = 4/3, row4 = square
  - `overflow: hidden`
  - Image fills card via `object-fit: cover`, `width: 100%`, `height: 100%`
  - On hover: image scales to `transform: scale(1.03)` over 600ms `cubic-bezier(0.25, 0.46, 0.45, 0.94)` — subtle, never jarring
  - On hover: dark overlay appears: `background: rgba(0,0,0,0.5)`, opacity 0→1 over 400ms
  - On hover overlay: project label appears in center — Cormorant Garant 400, 1.1rem, color #F5F0E8, tracking 0.1em — translateY(8px)→translateY(0) on appear
- Lightbox: clicking any project card opens a full-screen lightbox
  - Dark overlay `rgba(0,0,0,0.95)`, z-index 1000
  - Image centered, max 90vw × 90vh, `object-fit: contain`
  - Close button: "×" top-right, Inter 300, 2rem
  - Prev/Next arrows: left/right edges, "←" / "→", Cormorant Garant, 2rem
  - Keyboard: Escape to close, ← → to navigate
  - Transition: image fades in over 300ms

### 5. PHILOSOPHY / ABOUT
- Background: `--color-surface` (#141414)
- Two-column layout (desktop): left 40%, right 60%
- Left: section label + heading — "ESTUDIO" label (Inter 300, 0.7rem, tracking 0.3em, uppercase, `--color-text-muted`), then heading "Un taller de momentos y lugares." in Cormorant Garant 300, 2.2rem
- Right: body text in Inter 300, 1rem, line-height 1.85, color `--color-text-muted`:
  "Somos un equipo que construye desde la convicción de que la arquitectura debe mejorar la vida de las personas. Trabajamos en proyectos residenciales y corporativos en Medellín y Colombia, guiados por el minimalismo, la honestidad de los materiales y el respeto por el lugar."
- Below the two columns, a full-width image strip — 3 cropped detail images side by side (height: 280px, `object-fit: cover`): `behance_161730713_08.jpg`, `behance_161710953_08.jpg`, `behance_161730713_12.jpg`
- Mobile: single column, image strip stacks

### 6. CONTACT
- Background: `--color-bg`
- Centered, max-width 600px
- Section label: "CONTACTO" (same style as other labels)
- Heading: "Conversemos." — Cormorant Garant 300, 3.5rem
- Subline: "¿Tienes un proyecto en mente? Cuéntanos." — Inter 300, 1rem, `--color-text-muted`
- 48px gap
- Two contact blocks side by side (or stacked on mobile):
  - Phone: "+57 316 384 3681" — Inter 300, 1rem — with phone icon (SVG, minimal)
  - WhatsApp CTA: a button "Escríbenos por WhatsApp" — border: 1px solid rgba(245,240,232,0.3), padding 14px 32px, Inter 300, 0.85rem, tracking 0.1em, color `--color-text`, no fill, no radius — on hover: border-color `--color-accent`, color `--color-accent`, transition 250ms
  - href: `https://wa.me/573163843681`
- Location: "Medellín, Colombia" — Inter 300, 0.8rem, tracking 0.15em, uppercase, `--color-text-muted`

### 7. FOOTER
- Single line, border-top `--color-border`
- Left: "© 2025 Tottem Arquitectura"
- Right: Instagram icon (SVG) linking to their Instagram
- Inter 300, 0.75rem, tracking 0.1em, `--color-text-muted`

---

## Interactions & Animations (Global)
1. **Page load**: All above-fold content fades in over 1200ms (no jank, use CSS animation, not JS)
2. **Scroll animations**: Use IntersectionObserver. Any section heading or body text not in initial viewport: translateY(24px) opacity:0 → translateY(0) opacity:1, 700ms ease. Stagger children by 100ms.
3. **Custom cursor** (desktop only): Replace default cursor with two concentric circles — outer ring 32px (1px stroke, rgba(245,240,232,0.4)), inner dot 4px (fill, rgba(245,240,232,0.9)). Outer ring lags cursor position by ~80ms (lerp effect). On hover over project cards: outer ring scales to 64px. On hover over links: outer ring scales to 48px and fills with `--color-accent` at 20% opacity. Use `pointer-events: none` on cursor elements. Hide cursor on mobile.
4. **Smooth scroll**: `scroll-behavior: smooth` on html element. Offset anchor scrolling by nav height (~64px).
5. **Nav hide/show**: On scroll down > 200px: nav translates up -100% (300ms ease). On scroll up: nav reappears (300ms ease). Always show on top of page.

---

## Image Project Labels
Use these for the hover overlays on project cards (in order of grid appearance):
1. "Casa Colinas" — `behance_161726219_01.jpg`
2. "Casa Laureles" — `behance_157821753_01.jpg`
3. "Casa Industrial" — `behance_161710953_01.jpg`
4. "Casa del Bosque" — `behance_161730713_05.jpg`
5. "Casa Encanto" — `behance_161730713_09.jpg`
6. "Pabellón 7" — `behance_157808365_01.jpg`
7. "Villa Nogal" — `behance_161730713_01.jpg`
8. "Casa Envigado" — `behance_161710953_05.jpg`
9. "Studio Provenza" — `behance_161723547_01.jpg`

---

## Mobile Responsiveness
Breakpoint: 768px
- Hero: text scales down to 11vw for wordmark
- Projects grid: 2 columns on tablet (600–768px), 1 column on mobile
- About: single column
- Contact blocks: stacked
- Custom cursor: disabled
- Nav: hamburger menu, full-screen overlay

---

## Performance
- Images must have `loading="lazy"` except the hero
- Hero image must be preloaded: `<link rel="preload" as="image">`
- No external JS libraries. No jQuery. No Bootstrap. Vanilla only.
- Google Fonts loaded with `display=swap`

---

## What this site must NOT have
- No stock photos
- No gradient backgrounds (the dark flat background is intentional)
- No drop shadows on cards
- No border-radius on image cards (sharp edges only)
- No Bootstrap grid
- No carousels or auto-rotating sliders
- No loading spinners
- No cookie banners
- No chat widgets
- No decorative elements that compete with the photography

---

## Final check
Before declaring done:
1. Open in Chrome at 1920×1080 — does the hero feel cinematic?
2. Open at 375×812 (iPhone) — is the grid readable and the text legible?
3. Hover over every project card — does the overlay feel smooth and elegant?
4. Click a project card — does the lightbox open without layout shift?
5. Scroll the full page — are the animations present but not annoying?
6. Check nav hide/show behavior — does it feel natural?

If any answer is no, fix it before finishing.
