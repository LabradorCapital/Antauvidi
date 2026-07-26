# Brand assets

Imported from the Claude Design project **Sitio Antauvidi**
(`036df62d-ef72-40bd-8347-2fc61156dd87`).

## Present

| File | Use |
| --- | --- |
| `logo-blanco.svg` | Header and footer lockup, reversed on Azul Marino |
| `logo-azul.svg` | Lockup on light backgrounds |
| `logo-color.svg` | Full-colour lockup (navy wordmark, coral accent) |
| `logomark-blanco.svg` | Reversed logomark on the product-line hero wash |
| `logomark-rojo.svg` | Coral logomark — used as the site favicon |

## Missing — photography

Four photographs the design references could **not** be pulled out of the
design project: every one of them is larger than the 256 KiB per-file read cap
of the design-project API, so they come back truncated rather than whole. They
are not in this repository, and the site is built to degrade cleanly until
they are added.

| File | Where it is used | Notes |
| --- | --- | --- |
| `foto-2.jpeg` | Home hero (full-bleed, `object-position: center 38%`) and the Casa line hero (`62% 72%`, mirrored) | JPEG, 6492 × 4130 in the source project |
| `foto-1.jpeg` | Salud line hero (`center 20%`, mirrored) | JPEG, 5614 × 3335 |
| `foto-auto.jpeg` | Auto line hero (`center`) | Despite the extension this file is a **PNG**, 551 × 913 |
| `foto-vida.jpeg` | Vida line hero (`center 26%`) | Not retrieved; dimensions unknown |

Drop the real files in beside this README under exactly these names and they
are picked up with no code change:

- The home hero `<img>` loads `assets/foto-2.jpeg`. While it is missing, the
  page switches itself to the design's own `heroTreatment: solido` variant — a
  flat Azul Marino field — instead of showing a broken image.
- Each line hero probes its photograph before applying it as a background. If
  the file is absent, the media column stays a solid brand field in that
  line's colour, under the same duotone wash.

Do not commit resized or re-encoded stand-ins under these names — the manual
calls for the licensed originals, warm-neutral and naturally lit, with the
navy or coral duotone applied in CSS rather than baked into the file.
