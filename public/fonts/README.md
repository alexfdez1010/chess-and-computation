# Self-hosted fonts

Downloaded 2026-10-06 from the official Google Fonts CSS API and Google Fonts repository. All families use the SIL Open Font License 1.1; license copies are included here.

CSS request: `https://fonts.googleapis.com/css2?family=Archivo:wght@400..900&family=Archivo+Black&family=Source+Serif+4:ital,wght@0,400..700;1,400..700&display=swap`

Archivo: variable weight 400–900, normal style, normal width. Archivo Black: static weight 400, normal style. Source Serif 4: variable weight 400–700, normal and italic styles. Both Latin and Latin extended subsets are included. Spanish accented letters, ñ, ¡ and ¿ are in the Latin subset.

| File | Official source |
| --- | --- |
| `archivo-latin-ext.woff2` | https://fonts.gstatic.com/s/archivo/v25/k3kPo8UDI-1M0wlSV9XAw6lQkqWY8Q82sLyTOxKsv4RnUPU.woff2 |
| `archivo-latin.woff2` | https://fonts.gstatic.com/s/archivo/v25/k3kPo8UDI-1M0wlSV9XAw6lQkqWY8Q82sLydOxKsv4Rn.woff2 |
| `archivo-black-latin-ext.woff2` | https://fonts.gstatic.com/s/archivoblack/v23/HTxqL289NzCGg4MzN6KJ7eW6CYKF_jzx13HOvQ.woff2 |
| `archivo-black-latin.woff2` | https://fonts.gstatic.com/s/archivoblack/v23/HTxqL289NzCGg4MzN6KJ7eW6CYyF_jzx13E.woff2 |
| `source-serif-4-italic-latin-ext.woff2` | https://fonts.gstatic.com/s/sourceserif4/v15/vEFH2_tTDB4M7-auWDN0ahZJW1ge6NmXpVAHV83Bfb_US0r0aX2SzxEjst4.woff2 |
| `source-serif-4-italic-latin.woff2` | https://fonts.gstatic.com/s/sourceserif4/v15/vEFH2_tTDB4M7-auWDN0ahZJW1ge6NmXpVAHV83Bfb_US0r6aX2SzxEj.woff2 |
| `source-serif-4-latin-ext.woff2` | https://fonts.gstatic.com/s/sourceserif4/v15/vEFF2_tTDB4M7-auWDN0ahZJW3IX2ih5nk3AucvUHf6kA3r4Y3qwzSEi.woff2 |
| `source-serif-4-latin.woff2` | https://fonts.gstatic.com/s/sourceserif4/v15/vEFF2_tTDB4M7-auWDN0ahZJW3IX2ih5nk3AucvUHf6kDXr4Y3qwzQ.woff2 |

## CSS metadata

Use the respective Unicode ranges to prevent duplicate downloads. Set `font-display: swap`.

```css
@font-face {
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 400 900;
  font-stretch: 100%;
  font-display: swap;
  src: url(/fonts/archivo-latin-ext.woff2) format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
@font-face {
  font-family: 'Archivo';
  font-style: normal;
  font-weight: 400 900;
  font-stretch: 100%;
  font-display: swap;
  src: url(/fonts/archivo-latin.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Archivo Black';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(/fonts/archivo-black-latin-ext.woff2) format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
@font-face {
  font-family: 'Archivo Black';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(/fonts/archivo-black-latin.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Source Serif 4';
  font-style: italic;
  font-weight: 400 700;
  font-display: swap;
  src: url(/fonts/source-serif-4-italic-latin-ext.woff2) format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
@font-face {
  font-family: 'Source Serif 4';
  font-style: italic;
  font-weight: 400 700;
  font-display: swap;
  src: url(/fonts/source-serif-4-italic-latin.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
@font-face {
  font-family: 'Source Serif 4';
  font-style: normal;
  font-weight: 400 700;
  font-display: swap;
  src: url(/fonts/source-serif-4-latin-ext.woff2) format('woff2');
  unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
@font-face {
  font-family: 'Source Serif 4';
  font-style: normal;
  font-weight: 400 700;
  font-display: swap;
  src: url(/fonts/source-serif-4-latin.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

## License provenance

- `archivo-OFL.txt`: https://raw.githubusercontent.com/google/fonts/main/ofl/archivo/OFL.txt
- `archivo-black-OFL.txt`: https://raw.githubusercontent.com/google/fonts/main/ofl/archivoblack/OFL.txt
- `source-serif-4-OFL.txt`: https://raw.githubusercontent.com/google/fonts/main/ofl/sourceserif4/OFL.txt
