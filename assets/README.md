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

| File | Where it is used | What it actually is | Recoverable |
| --- | --- | --- | --- |
| `foto-2.jpeg` | Home hero (full-bleed, `object-position: center 38%`) and the Casa line hero (`62% 72%`, mirrored) | baseline JPEG, 6492 × 4130 | 96 of 4130 rows (2.3%) |
| `foto-1.jpeg` | Salud line hero (`center 20%`, mirrored) | baseline JPEG, 5614 × 3335 | 24 of 3335 rows (0.7%) |
| `foto-vida.jpeg` | Vida line hero (`center 26%`) | **PNG** despite the extension, 1400 × 1177, non-interlaced | 86 of 1177 rows (7.3%) |
| `foto-auto.jpeg` | Auto line hero (`center`) | **PNG** despite the extension, 551 × 913, non-interlaced | 162 of 913 rows (17.7%) |

Nothing salvageable: the JPEGs are baseline rather than progressive and the PNGs
are not Adam7-interlaced, so a truncated read yields only the top few percent of
scanlines, not a low-resolution version of the whole frame. Measured, not
estimated — the percentages above come from decoding what did arrive.

Two notes for whoever supplies the originals:

- **Keep the filenames exactly as they are**, `.jpeg` extension included, even
  on the two that are really PNGs. The page references those literal names and
  browsers sniff the actual format, so it works either way.
- `foto-auto.jpeg` is only 551 × 913 in the source project. It is used as a
  full-bleed `background-size: cover` panel, so it will look soft on a desktop
  viewport. Worth replacing with a larger frame if one exists.
- `foto-2.jpeg` at 6492 × 4130 is far larger than a web hero needs. Resizing to
  roughly 2400 px wide before committing keeps the page fast.

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
