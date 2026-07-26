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

The design references four photographs. **Two are here, two are still
missing.** None of them could be read out of the design project directly:
every one exceeds the 256 KiB per-file cap of the design-project API and comes
back truncated, and the formats rule out salvaging a low-resolution version —
the JPEGs are baseline rather than progressive, and the PNGs are not
Adam7-interlaced, so a truncated read returns only the top scanlines. Decoding
what did arrive yielded 0.7%, 2.3%, 7.3% and 17.7% of each frame respectively.

### Present

Supplied directly by the client and verified against the recoverable top
scanlines of the originals before being committed (mean per-pixel difference
18.8 and 4.4 out of 255 — same photographs, downscaled).

| File | Where it is used | Here | In the design project |
| --- | --- | --- | --- |
| `foto-2.jpeg` | Home hero (full-bleed, `object-position: center 38%`) and the Casa line hero (`62% 72%`, mirrored) | JPEG 2000 × 1272, 410 KB | baseline JPEG 6492 × 4130 |
| `foto-1.jpeg` | Salud line hero (`center 20%`, mirrored) | JPEG 2000 × 1188, 233 KB | baseline JPEG 5614 × 3335 |

2000 px wide is sized for a full-bleed hero; the originals are far larger than
a web page needs.

### Still missing

| File | Where it is used | What the original is |
| --- | --- | --- |
| `foto-vida.jpeg` | Vida line hero (`center 26%`) | **PNG** despite the extension, 1400 × 1177 |
| `foto-auto.jpeg` | Auto line hero (`center`) | **PNG** despite the extension, 551 × 913 |

Drop them in beside this README under exactly those names — `.jpeg` extension
included, even though both are really PNGs. The page references those literal
names and browsers sniff the actual format, so it works either way. No code
change is needed: each line hero probes its photograph and applies it if it
loads.

Until then the Vida and Auto heroes carry `.is-nophoto`, which spreads the
duotone wash across the whole media column so the panel reads as the manual's
solid-colour blocking rather than a failed image.

Note on `foto-auto.jpeg`: at 551 × 913 the original is small for the
full-bleed `background-size: cover` panel it fills, and will look soft on a
desktop viewport. Worth sourcing a larger frame.

## Rules

Do not commit stand-in imagery under these names. The manual calls for the
licensed originals — warm-neutral, naturally lit, real-world scenes — with the
navy or coral duotone applied in CSS rather than baked into the file.
