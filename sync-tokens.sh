#!/bin/sh
# Re-copy the design-system token stylesheets into styles/tokens/.
#
# The page loads tokens from styles/tokens/ rather than straight out of
# _ds/…/tokens/, because a leading underscore makes a directory invisible to
# Jekyll on GitHub Pages and to several other static hosts. _ds/ stays as the
# imported design system of record; styles/tokens/ is the copy that ships.
#
# Run this after re-importing the design system, then commit the result.
set -eu

cd "$(dirname "$0")"
SRC="_ds/antauvidi-design-system-92f6524b-cf0b-497f-b75e-7816dc1ea0d9/tokens"
DEST="styles/tokens"

# fonts.css is deliberately not copied — styles/fonts.css replaces it because
# the Tinos .ttf binaries were never retrievable. See styles/fonts.css.
mkdir -p "$DEST"
for f in colors typography spacing effects dataviz base; do
  cp "$SRC/$f.css" "$DEST/$f.css"
  echo "  $f.css"
done
echo "Tokens synced into $DEST"
