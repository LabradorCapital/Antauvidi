# Antaŭvidi — sitio

Marketing site for **Antaŭvidi**, an insurance-backing brand in northern
Mexico covering four lines: Vida, Salud (gastos médicos mayores), Auto and
Casa.

Implemented from the Claude Design project
[Sitio Antauvidi](https://claude.ai/design/p/036df62d-ef72-40bd-8347-2fc61156dd87?file=Sitio+Antauvidi.dc.html).

## Running it

Static files, no build step, no runtime dependencies. Serve the repository
root over HTTP:

```sh
python3 -m http.server 8000
# → http://localhost:8000/
```

Opening `index.html` straight off the filesystem works too, though the Google
Fonts request needs network access either way.

## Deploying

The site is plain static files and depends on nothing at runtime except the
Google Fonts request. Serve the repository root; any host works.

**Nothing the page loads lives under an underscore-prefixed path.** That is
deliberate. GitHub Pages runs the served branch through Jekyll, and Jekyll
drops every top-level path beginning with `_` from the published output —
which silently deleted the whole of `_ds/`, 404'd all six design-token
stylesheets, and left every `var(--color-*)`, `var(--font-*)` and
`var(--space-*)` resolving to nothing: white text on a white background, no
brand colours, no type. The page read as blank rather than broken.

Two layers guard against it now:

1. `styles/tokens/` holds byte-identical copies of the token stylesheets and
   is what `index.html` actually loads. `_ds/` can be stripped entirely and
   the site still renders correctly — verified.
2. `.nojekyll` at the repository root turns Jekyll off anyway, so `_ds/` and
   the imported design file stay browsable on Pages.

Keep both. Re-run `./sync-tokens.sh` after re-importing the design system.

Every project imported from Claude Design ships the same `_ds/` folder and
hits this the same way, so do the same thing there.

If Pages serves nothing at all, check Settings → Pages: the source must be
**Deploy from a branch**, on the branch that holds this code. If it is set to
*GitHub Actions* instead, a deploy workflow is required.

## Layout

```
.nojekyll                  disables Jekyll on GitHub Pages (see above)
index.html                 the site
styles/tokens/             design tokens the page loads (copies of _ds/…/tokens)
styles/fonts.css           Tinos + Karla (see "Fonts" below)
styles/components.css      design-system components as dependency-free CSS
styles/site.css            page styles
scripts/site.js            routing, cotizador, forms, scroll reveal
assets/                    logos (see assets/README.md re: photography)
_ds/antauvidi-…/           the Antaŭvidi design system, imported as-is
Sitio Antauvidi.dc.html    the design source, imported as-is
support.js                 Claude Design runtime for the .dc.html file
sync-tokens.sh             re-copies _ds/…/tokens into styles/tokens
```

`_ds/`, `Sitio Antauvidi.dc.html` and `support.js` are the imported design
artefacts and are not edited by hand — they are the reference the site is
built against. Everything in `index.html`, `styles/` and `scripts/` is the
implementation.

## Routes

Hash routing, so the site can be hosted from any static bucket:

| Hash | View |
| --- | --- |
| `#` | Home |
| `#vida` | Seguro de vida |
| `#salud` | Seguro de salud (`gmm` in the design data) |
| `#auto` | Seguro de auto |
| `#casa` | Seguro de casa |
| `#cotizador` | Home, scrolled to the quote flow |
| `#agentes` | Home, scrolled to the agent section |

## Design-file props

The design file exposes three authoring props. Both branches of each are
implemented and reachable through query parameters:

| Prop | Parameter | Default |
| --- | --- | --- |
| `heroTreatment` | `?hero=foto` \| `?hero=solido` | `foto` |
| `quoteMode` | `?cotizador=completo` \| `?cotizador=simple` | `completo` |
| `revealAnimations` | `?motion=on` \| `?motion=off` | `on` |

`heroTreatment` also falls back to `solido` on its own when the hero
photograph is unavailable.

## Design system

Tokens come from `_ds/antauvidi-…/tokens/` unchanged, copied into
`styles/tokens/` by `sync-tokens.sh` (see "Deploying" for why) — colours (three tiers
plus the dark-theme remap), typography, spacing and density, effects, dataviz
and base behaviours. Nothing in the implementation hard-codes a brand colour
that a token already covers.

The design file renders five components out of the design system's React
bundle (`Stepper`, `Input`, `Select`, `Checkbox`, `Alert`). This site ships
static, so those five are reproduced in `styles/components.css` with the same
markup shape, metrics and semantic tokens as the bundle's JSX. Keep them in
sync if the bundle changes.

## Known gaps

- **Photography.** All four line photographs are in, supplied by the client —
  none could be read out of the design project, which caps file reads at
  256 KiB. Vida carries a deliberate substitution: the design project's
  `foto-vida.jpeg` turns out to be a tighter crop of the same family picture
  the home hero already uses, so an elderly-couple frame replaces it at the
  client's direction. See [`assets/README.md`](assets/README.md).
- **Fonts.** Same cap, same outcome for the Tinos `.ttf` binaries, so Tinos
  and Karla are both loaded from Google Fonts. See
  [`_ds/antauvidi-…/assets/fonts/README.md`](_ds/antauvidi-design-system-92f6524b-cf0b-497f-b75e-7816dc1ea0d9/assets/fonts/README.md).
- **Forms do not submit anywhere.** The cotizador and the agent form validate
  and show their confirmation state client-side only, exactly as the design
  does. Wire them to a real endpoint before launch.
- **Legal pages.** "Aviso de privacidad", "Términos de uso" and "Condiciones
  generales" are inert in the design and stay inert here.

## Deviation from the design file

One: on step 1 of the cotizador the design sets an "Elige una línea" error but
never renders it, so pressing *Continuar* without a selection does nothing
visible. The site renders that message.
