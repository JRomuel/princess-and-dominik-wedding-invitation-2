# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Travel-themed wedding invitation SPA for Princes & Dominik (January 28, 2027, Boac Cathedral ceremony and Luxor Resort reception, Marinduque, Philippines).

## Commands

```bash
npm run dev       # Vite dev server with HMR
npm run build     # tsc -b + Vite production build
npm run lint      # ESLint check (no auto-fix)
npm run preview   # Preview production build
```

## TypeScript

- Version 6 with `erasableSyntaxOnly: true` — no `const enum`, no experimental decorators; use only type-erasing constructs
- `noUnusedLocals` and `noUnusedParameters` are on — the build fails on unused variables
- New JSX transform is active — do **not** add `import React from 'react'` in components

## CSS

Plain CSS only — no modules, no Tailwind, no Sass. Component styles go in `src/App.css`; global resets and design tokens live in `src/index.css`.

Design tokens:
```css
--primary:   #A34720   /* terracotta */
--secondary: #D2B396   /* warm beige */
--cream:     #FAF6F0   /* page background */
--sans / --heading: system-ui stack
```

Use `clamp()` for responsive sizing. Scattered card layouts use absolute positioning with `calc(50% ± offset)`.

## Routing

React Router v7. Routes: `/` (Home — envelope/card landing) and `/details` (countdown, RSVP). Wedding data (date, RSVP deadline, ceremony/reception names & addresses) lives in the `W` constant in `src/pages/Details/weddingInfo.ts`.

## RSVP

Client-side only — no backend wired up yet.
