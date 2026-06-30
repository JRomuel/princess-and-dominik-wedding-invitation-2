---
name: new-page
description: Scaffold a new route/page component for the Princess & Dominik wedding site with correct travel-theme CSS patterns.
disable-model-invocation: false
---

When the user asks to add a new page or section:

1. Create the component at `src/pages/<PageName>.tsx`. Use a named default export. Do NOT add `import React from 'react'`.

2. Add a corresponding route in the router configuration (React Router v7).

3. Add styles to `src/App.css` using the design tokens from `src/index.css`:
   - Colors: `var(--primary)`, `var(--secondary)`, `var(--cream)`
   - Fonts: `var(--sans)`, `var(--heading)`
   - Use `clamp()` for font sizes and spacing that should scale with viewport
   - Card/scattered layouts use absolute positioning with `calc(50% ± offset)`

4. Keep the travel-themed aesthetic: warm terracotta + cream palette, elegant serif-adjacent headings, layered card compositions.

5. Wedding data (couple names, date, venue) lives in the `W` constant at the top of `src/pages/Details.tsx` — import from there rather than hardcoding strings.
