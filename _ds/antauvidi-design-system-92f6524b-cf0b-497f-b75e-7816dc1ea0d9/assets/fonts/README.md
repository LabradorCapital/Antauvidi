# Font binaries — not imported

`tokens/fonts.css` declares `@font-face` rules for Tinos (regular, italic,
bold, bold-italic) and Fira Sans, pointing at `.ttf` files in this directory.

Those binaries could not be pulled out of the Claude Design project: each one
exceeds the 256 KiB per-file read cap of the design-project API and comes back
truncated, and a truncated font file is worse than no font file.

The site therefore does **not** link `tokens/fonts.css`. It loads
`styles/fonts.css` instead, which fetches both official families — Tinos and
Karla — from Google Fonts. Both are the same open-source families Google Fonts
distributes, so this is a same-family fetch rather than a substitution, and it
extends the rationale the design system already documents for Karla (see the
"Typography note" in `../../readme.md`).

To restore the design system's own font loading: copy the real `.ttf` files
here, then swap `styles/fonts.css` for `tokens/fonts.css` in `index.html`.

Files expected here:

- `Tinos-Regular.ttf`
- `Tinos-Italic.ttf`
- `Tinos-Bold.ttf`
- `Tinos-BoldItalic.ttf`
- `FiraSans-Regular.ttf` (declared for completeness; not used by any token or
  component)
