# Brand assets

Imported from the Claude Design project **Sitio Antauvidi**
(`036df62d-ef72-40bd-8347-2fc61156dd87`).

## Logos

| File | Use |
| --- | --- |
| `logo-blanco.svg` | Header and footer lockup, reversed on Azul Marino |
| `logo-azul.svg` | Lockup on light backgrounds |
| `logo-color.svg` | Full-colour lockup (navy wordmark, coral accent) |
| `logomark-blanco.svg` | Reversed logomark on the product-line hero wash |
| `logomark-rojo.svg` | Coral logomark — used as the site favicon |

## Photography

All four line photographs are in place. None of them could be read out of the
design project directly — every one exceeds its 256 KiB per-file cap and comes
back truncated, and the formats rule out salvaging a low-resolution version
(the JPEGs are baseline rather than progressive, the PNGs are not
Adam7-interlaced), so a truncated read returns only the top 0.7–17.7% of
scanlines. They were supplied by the client instead.

| File | Where it is used | Here | Provenance |
| --- | --- | --- | --- |
| `foto-2.jpeg` | Home hero (`center 38%`) and Casa line hero (`62% 72%`, mirrored) | 2000 × 1272 | Client. Verified against the original's recoverable scanlines: mean difference 4.4/255 |
| `foto-1.jpeg` | Salud line hero (`center 20%`, mirrored) | 2000 × 1188 | Client. Verified the same way: 18.8/255 |
| `foto-auto.jpeg` | Auto line hero (`center`) | 1225 × 1327 | Client, clean frame. Same photograph as the original 551 × 913, wider crop |
| `foto-vida.jpeg` | Vida line hero (`center`) | 1000 × 1115 | **Different photograph, by client direction** — see below |

### Vida is a deliberate substitution

The `foto-vida.jpeg` in the design project is not a separate photograph at
all: decoding its recoverable top scanlines shows the fingertips-forming-a-roof
and the shelving behind them, i.e. a tighter crop of the same family picture
that `foto-2.jpeg` already carries. Using it would have put the same image on
both the home hero and the Vida line.

The client supplied an elderly couple on a beach for Vida instead, which reads
better against "Tu legado, en manos firmes" and removes the duplication. It is
cropped to 1000 × 1115 with the couple at roughly 70% horizontally, so they
land in the clean half of the media column rather than behind the duotone
wash — which is also why `scripts/site.js` gives Vida `pos: 'center'` instead
of the design's `center 26%`.

### Available, not wired in

| File | Notes |
| --- | --- |
| `foto-salud-alt.jpeg` | 2000 × 1121, doctor completing a form. The frame behind the Salud social post. Salud currently uses `foto-1.jpeg` (the medical team); swap the path in `scripts/site.js` to use this instead |

## Share and icon artwork

| File | Use |
| --- | --- |
| `og-cover.jpg` | 2000 × 761 — the social kit's cover artwork, with logotype, claim and URL chip already composed. Wired as `og:image` / `twitter:image` |
| `apple-touch-icon.png` | 180 × 180 — coral logomark on Azul Marino. iOS ignores SVG favicons, so the home-screen icon needs this raster square |

## Rules

Do not commit stand-in imagery under these names. The manual calls for the
licensed originals — warm-neutral, naturally lit, real-world scenes — with the
navy or coral duotone applied in CSS rather than baked into the file.
