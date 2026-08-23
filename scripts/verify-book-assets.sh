#!/bin/sh
set -eu

root="${1:-public/assets/book}"

test -d "$root"

total=$(find "$root" -type f | wc -l | tr -d ' ')
png=$(find "$root" -type f -name '*.png' | wc -l | tr -d ' ')
svg=$(find "$root" -type f -name '*.svg' | wc -l | tr -d ' ')

test "$total" = 77
test "$png" = 45
test "$svg" = 32

while IFS= read -r file; do
  test -s "$file"
  case "$file" in
    *.png) file "$file" | grep -q 'PNG image data' ;;
    *.svg) grep -q '<svg' "$file" ;;
  esac
done <<EOF
$(find "$root" -type f | sort)
EOF

echo "asset QA passed: $total files ($png PNG, $svg SVG)"
