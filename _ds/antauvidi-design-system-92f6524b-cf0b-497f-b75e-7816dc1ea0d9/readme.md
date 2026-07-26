# Antaŭvidi — Design System

Antaŭvidi ("ver antes" / "to foresee" in Esperanto) is an insurance-backing brand based in northern Mexico, born as a diversification vehicle for Promessa. It backs insurance agents and end clients across four lines: **Vida** (life), **Gastos Médicos Mayores** (major medical), **Auto**, and **Casa** (home). It is not itself a public-facing insurer app — its materials are corporate identity, agent-facing collateral, and a marketing site — so this system is built from the brand's **official identity manual and collateral**, not a product codebase.

## Sources

This system was built entirely from an attached brand asset pack, `Antauvidi 2025/` (no Figma file, no app codebase was provided/available):

- `Manual y Guía de Uso/251120-Antauvidi-Manual de identidad.pdf` — the full identity manual (33 pp.): brand story, purpose, values, brand personality, tone of voice, color system, typography, logo construction/safe area/minimum size/misuse, logomark meaning, photography direction, and application specs (business card, letterhead, corporate manual, folder, email signature, web, presentations, collateral).
- `Manual y Guía de Uso/251120-Antauvidi-Guía-de-Uso.pdf` — a condensed one-page quick-reference version of the same rules.
- `Presentaciones/251027-Antauvidi-IdentidadVisual.pdf` and `251002-Antauvidi-Moodboards.pdf` — the design agency's (Sofía Torres, sofiatorres.com) strategy/mood decks: brand-as-a-person exercise, competitive audit, typography/color rationale, audience definitions.
- `Logo y Logomark/` — official logo and logomark lockups, RGB + CMYK, in SVG/PNG/AI, across color/black/white/white-coral variants.
- `Fonts/Tinos` and `Fonts/Fira_Sans` — provided webfont binaries (see Typography note below — Fira Sans is not part of the documented type system).
- `Materiales/` — real production collateral: business card, letterhead, corporate manual, presentation folder, email signature, social media kit (profile/cover art + 4 post templates), a web page mockup (`.ai`, not readable by these tools), and two licensed stock photographs used on the website.
- `Presentaciones/…-Presentación.pptx` — the official slide deck template (title, section separator, content, closing/contact layouts), used as the source for the Slides group in this system.

No Figma link or source-controlled codebase was given, so the component inventory below is an **authored standard set** sized to the brand's needs (see "Intentional additions"), not an enumerated import.

## Intentional additions

Because no component library or app source was provided, the components in this system are an authored standard set rather than a copied inventory. They follow the manual's color, type, corner, and tone rules as closely as possible.

The original authored set (Button, IconButton, Badge, Tag, Card, Input, Select, Checkbox, Radio, Switch, Tabs, Dialog, Toast, Tooltip) was later **extended into a production-grade inventory** sized to the brand's four real surfaces (agent ops console, marketing site, corporate docs, future insurer app):

- **Forms**: Field (label/help/error/counter wrapper with ARIA wiring), Textarea, Autocomplete (typeahead combobox), DatePicker (es-MX calendar), TimePicker (citas), Slider, Rating, Upload (dropzone), plus the original Input, Select, Checkbox, Radio, Switch.
- **Feedback**: Alert, Progress, Spinner, Skeleton, EmptyState, Drawer, Backdrop (blocking scrim), plus the original Dialog, Toast, Tooltip.
- **Overlays**: Menu (action dropdown), Popover (anchored rich panel).
- **Navigation**: Breadcrumbs, Pagination, Stepper, AppBar (navy app header), BottomNavigation (mobile), plus the original Tabs.
- **Core**: Chip (selectable/deletable filter chip), List (structured item list), Typography (type-ramp component), Link, Paper (elevation surface), Stack + Container (layout shorthands), Divider, ButtonGroup, ToggleButtonGroup (segmented switch), Fab, SpeedDial, NotificationBadge (corner count), plus the original Button, IconButton, Badge, Tag, Card.
- **Data (ops console)**: Table (sortable, selectable, density-aware), Avatar + AvatarGroup, Accordion, StatusIndicator (glyph + label — never color alone), StatTile (KPI), Timeline (audit stream), TreeView (hierarchies), TransferList (assignment), Chart (bar/line/donut on dataviz tokens), Carousel, Lightbox, ImageList (photo grid).
- **Domain (Mexican finance)**: AmountInput (es-MX grouping, MXN/USD affix), MaskedInput (CLABE 3-3-11-1 grouping, RFC, CURP — paste-normalizing).

Every component consumes semantic tokens only, so all of them inherit dark mode and density for free.

## Index

- `styles.css` — root stylesheet, `@import`s only. Link this one file.
- `tokens/` — `colors.css` (three-tier: primitives → semantic roles → legacy aliases; includes the dark theme), `typography.css`, `spacing.css` (+ density modes, control metrics, breakpoints), `effects.css` (radii, elevation, z-scale, motion, focus ring), `dataviz.css` (chart palette), `base.css` (focus-visible ring, reduced motion, selection, numeric utilities), `fonts.css` (`@font-face`).
- `assets/logos/` — official logo + logomark, color/navy/black/white/white-coral, SVG + PNG.
- `assets/fonts/` — Tinos (regular/bold/italic/bold-italic) and Fira Sans binaries as provided. Karla (the brand's official second typeface) had **no font files in the source pack** — substituted from Google Fonts, see Typography note.
- `assets/photography/` — the two licensed stock photos from the web materials.
- `assets/social/` — social kit exports (profile pic, FB cover, 4 post templates) for reference.
- `guidelines/` — foundation specimen cards (Design System tab: Brand, Colors, Type, Spacing, Foundations, Patterns, Content groups).
- `components/core/` — Button, IconButton, Badge, Tag, Card, Chip, List, Typography, Link, Paper, Stack, Container, Divider, ButtonGroup, ToggleButtonGroup, Fab, SpeedDial, NotificationBadge, TextMaxLine.
- `components/forms/` — Input, Select, Checkbox, Radio, Switch, Field, Textarea, Autocomplete, DatePicker, TimePicker, Slider, Rating, Upload, Editor.
- `components/navigation/` — Tabs, Breadcrumbs, Pagination, Stepper, AppBar, BottomNavigation, MegaMenu, ScrollProgress + ScrollToTop.
- `components/feedback/` — Dialog, Toast, Tooltip, Alert, Progress, Spinner, Skeleton, EmptyState, Drawer, Backdrop.
- `components/overlays/` — Menu, Popover, Walktour.
- `components/data/` — Table, Avatar, AvatarGroup, Accordion, StatusIndicator, StatTile, Timeline, TreeView, TransferList, Chart, Carousel, Lightbox, ImageList, Img, Markdown, OrgChart, SortableList.
- `components/domain/` — AmountInput, MaskedInput (CLABE/RFC/CURP).
- `ui_kits/website/` — marketing website recreation (Home, Product/Seguro detail, Contact), per the guide's documented web-page type spec.
- `slides/` — presentation template slides (Title, Section, Content, Quote, Closing) based on the official PowerPoint template structure.

## Token architecture

`tokens/colors.css` is organized in three tiers:

1. **Primitives** — brand hexes verbatim (`--azul-marino`, `--coral`, `--azul-cielo`, `--arena`) plus derived oklch ramps (`--navy-50..950`, `--coral-100..700`, sky/arena steps, neutrals, status greens/ambers, alpha scales). Never consume these directly in components.
2. **Semantic roles** (`--color-bg-*`, `--color-fg-*`, `--color-border-*`, `--color-delta-*`) — the only tier components should reference. Interaction states (`-hover`, `-active`, `-selected`), status pairs (`-subtle` bg + `fg` per tone) and finance deltas live here.
3. **Legacy aliases** (`--surface-*`, `--text-*`, `--accent-*`, `--border-*`) — deprecated but live, remapped onto tier 2 so older cards/kits keep working. Don't use in new work.

**Dark theme**: `[data-theme="dark"]` on `<html>` (or any subtree) re-maps tier 2 only — deep-navy surfaces (never black), sky-blue takes over brand-fill duty from navy, coral lifts one step for contrast, borders switch to white-alpha. Anything written against semantic tokens inherits it automatically.

**Density**: `[data-density="compact"]` steps down `--control-height-*`, table row heights and paddings for ops/back-office surfaces. Comfortable is the default.

**Other foundations** (`effects.css`): elevation roles `--elevation-0..500` (flat, barely-there — print-first brand), z-scale `--z-dropdown..--z-tooltip`, motion durations/easings (calm, 120–320ms), border widths, opacity steps, and the single system-wide **coral focus ring** (`:focus-visible` via `tokens/base.css`, 2px + 2px offset). `dataviz.css` holds the 6-hue categorical chart palette, sequential/diverging ramps and `--delta-gain/loss/pending` (always paired with ▲▼ glyphs, never color alone).

---

## Content Fundamentals

**Tone of voice** (from the manual, "Tono de Voz y Redacción"): *"Comunicamos con claridad, transmitiendo confianza en cada mensaje. Nuestro lenguaje es sobrio pero accesible."* The five writing pillars, verbatim:
- **Precisión** — clear, concise sentences; no unnecessary flourish.
- **Elegancia accesible** — formal, careful language, but easy to understand.
- **Autoridad** — speak with confidence and knowledge, leadership without arrogance.
- **Confianza** — every message reinforces backing/security.
- **Cercanía** — make the client feel accompanied, understood.

The brand plots itself on five voice spectrums, landing consistently on the right-hand (measured) side: Innovadora↔**Tradicional**, Divertida↔**Seria**, Cercana↔**Exclusiva**, Casual↔**Elegante**, Emotiva↔**Directa**. Read together: warm but composed, never jokey, never hard-sell.

**Brand-as-a-person**: a 50-year-old insurance-industry man, married, based in the city, wears a suit, projects seriedad but is accessible — a good listener who puts people at ease. A lawyer by training, an industry leader active in financial institutions, disciplined, intellectually curious (reads about trends, stays current on technology), likes cars and gadgets. Traits distilled to five: **Accesible, Honesto, Líder, Responsable, Inteligente.**

**Grammatical person**: copy speaks as "**nosotros**" (Antaŭvidi as a first-person plural institution — "Ofrecemos…", "Comunicamos…", "Nos distinguimos…") addressing "**usted/el cliente**" in third person in formal materials, sliding into a direct "**tú**" in social/ad copy ("Maneja tranquilo, nosotros te cuidamos", "Estar protegido es vivir con confianza"). Headlines are short declaratives, 3–6 words; body copy runs 1–2 sentences before a CTA.

**Casing**: Sentence case for headlines and body copy (Tinos serif). Subtitles/eyebrows/nav labels/CTAs run in **Karla Bold, ALL CAPS, +100pt letter-spacing** — this is a deliberate, repeated system rule, not incidental. Never mix — body copy is never tracked-out caps.

**Emoji**: none anywhere in the source materials (manual, social kit, deck). Do not use emoji.

**Example headlines actually in the source materials** (for calibration, do not reuse verbatim in production without legal review): *"El aliado perfecto que hace simple el mundo de los seguros."* / *"Estar protegido es vivir con confianza."* / *"Tu camino, siempre protegido."* — each pairs a short declarative Tinos headline with one Karla sentence of support copy and a boxed URL/CTA chip.

**Vibe**: measured, professional, reassuring — an experienced advisor, not a startup. Confidence over hype; calm over urgency.

---

## Visual Foundations

**Color**: four brand colors, each mapped to one insurance line so color alone signals product context:
- **Azul Marino** `#162947` (Pantone 2955 C) — backgrounds and text; mapped to **Seguros de Vida**. The dominant, most-used color.
- **Coral** `#F04B54` (Pantone Red 032 C) — accents and icons only, never large fields; mapped to **Seguros de Auto**.
- **Azul Cielo** `#CBDEF2` (Pantone 2717 C) — backgrounds; mapped to **Gastos Médicos Mayores**.
- **Arena** `#E8E2D7` (Pantone 7527 C) — backgrounds; mapped to **Seguros de Casa**.
RGB values run brighter/more luminous than CMYK, which is more muted — pick per output medium. For long text runs where ink cost matters, pure black (K100) is allowed in print. A neutral grayscale (graphite → white) was derived for UI chrome (borders, disabled states, secondary text) since the manual doesn't specify one; it's tuned to sit quietly next to Azul Marino.

**Type**: two families, both serving distinct roles — never interchange them:
- **Tinos** (serif) — titles, headlines, pull quotes, testimonial copy. Structure and formality; "aporta estructura y un tono formal que sostiene los mensajes principales."
- **Karla** (sans) — body copy, UI labels, buttons, nav, eyebrows/subtitles. "Más neutral y contemporánea, facilita la lectura." Subtitles/eyebrows use Karla **Bold, uppercase, 100pt tracking** — a very specific, repeated brand tic worth preserving exactly.
No numeric type scale was published; this system defines one (see `tokens/typography.css`) sized around the documented roles (display/title in Tinos, body/UI in Karla) rather than inventing sizes freely.

**Backgrounds & imagery**: full-bleed photography is standard (business people, agents, families, calm domestic/outdoor scenes) — the manual explicitly asks for warm, orderly, well-lit real-world scenes ("luz natural, gestos y entornos cuidados... calma, control y claridad"), never staged/surreal. Solid-color blocking is the other primary background mode — large flat fields of Azul Marino, Azul Cielo, or Arena, always leaving generous negative space for type ("dejando el resto del espacio en un color sólido que permita la correcta lectura"). Photos should occupy roughly 40%+ of a layout when used. A recurring, distinctive treatment: **a solid Azul Marino (or Coral) duotone wash over photography**, logo/logomark reversed to white sitting on top — seen across the social kit and the presentation cover. No hand-drawn illustration, no repeating pattern/texture, no decorative gradients (the misuse rules explicitly forbid gradients on the logotype, and none appear anywhere else either).

**Iconography**: see dedicated section below.

**Motion**: the manual is silent on animation (this is a print/identity-first system). Treat this as a **calm, low-motion brand** — short, subtle fades/opacity transitions on hover only; no bounce, no springs, no looping decorative animation. This is a default inference, not a documented rule — flag if the user wants something more specific.

**Hover / press states**: undocumented in source. Defaults chosen to match the sober tone: hover = slightly darken Azul Marino fills / lighten by ~8% for outline-on-dark, underline for text links; press = a small further darken + 1px inset, no scale/bounce.

**Borders & shadows**: the identity is flat and print-first — no shadow system is documented. Cards in the UI kit/components use a hairline neutral border and a very low, soft ambient shadow (barely-there elevation), consistent with a "sólido, limpio" (solid, clean) description used repeatedly for materials. Corner radii are modest and consistent (buttons/inputs/tags small radius, cards a touch larger) — the logotype and logomark themselves are sharp-edged/geometric with zero rounding, so radius is used sparingly, only where it aids touch/click affordance.

**Protection zones vs. capsules**: the logo has a documented clear-space rule (the width of the "A" defines the safe area on all sides) and a documented minimum size (2 cm logotype / 0.5 cm logomark) — always honor both; never crop into that zone. URLs/CTAs in the social kit are consistently set as solid-color capsule chips (Coral-on-navy or Sky/Arena-on-navy), a pattern reused in this system for tags/badges.

**Transparency & blur**: no blur/glassmorphism anywhere in source. The only transparency usage is the duotone photo overlay described above (a solid color at reduced opacity/multiply over an image) — never used on UI chrome.

**Color vibe of imagery**: warm-neutral, naturally lit, corporate-editorial stock photography (professionals in medical/office settings, families at home) — not black & white, not heavily graded, no grain/filter.

---

## Iconography

No icon font, SVG icon sprite, or icon component library exists in the source pack. The only icon-like asset found is a single line-art heart/EKG-pulse + shield-checkmark illustration used once on the presentation title slide — thin, uniform ~3px stroke, rounded caps/joins, single-color (Azul Marino), no fill. That stroke language (simple, geometric, rounded-line, single-weight) is the brand's implied icon direction.

**Substitution**: this system uses **Lucide** (CDN, `lucide.dev`) for all interface icons — its default 2px round-cap/round-join stroke style is the closest open match to the one hand-built icon found in source. This is a flagged substitution, not a documented brand asset; swap it for a licensed icon set if the client has one. Emoji and Unicode glyphs are not used as icons anywhere.

---

## Typography note — font substitution flagged

The identity manual specifies **Tinos + Karla** as the two official typefaces. The attached asset pack's `Fonts/` folder contains **Tinos** ✅ but **not Karla** — instead it contains **Fira Sans**, a family never mentioned in any brand document. Karla and Fira Sans are visually unrelated (Karla is a rounded grotesque; Fira Sans is Mozilla's more technical/geometric grotesque), so Fira Sans was **not** substituted in as Karla's replacement — that would misrepresent the brand's actual type system.

Instead, **Karla is loaded from Google Fonts** (it's the same open-source family Google Fonts distributes, so this is a same-family fetch, not a stand-in) via `tokens/fonts.css`. Fira Sans's binaries were copied into `assets/fonts/` for reference/safekeeping but are **not wired into any token or component** — please confirm with the client whether Fira Sans has a real, undocumented role (e.g. a sub-brand or Promessa-parent system) before using it anywhere.

**Ask**: if you have the real Karla static/variable font files (rather than the Google Fonts copy) or clarity on Fira Sans's role, please share them and we'll swap them in.
