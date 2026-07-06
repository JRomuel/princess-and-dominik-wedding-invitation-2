# Skills

Project-specific Claude Code skills live in `.claude/skills/`. Each is a `SKILL.md` that Claude can invoke automatically when the task matches, or that you can trigger explicitly with `/<name>`.

## `new-page`

**File:** `.claude/skills/new-page/SKILL.md`

Scaffolds a new route/page component for the site with the correct travel-theme conventions. Use when adding a new page or section.

Enforces:
- Component goes in `src/pages/<PageName>.tsx`, named default export, no `import React from 'react'` (new JSX transform).
- Adds a matching route via React Router v7.
- Styles go in `src/App.css` using design tokens from `src/index.css` (`--primary`, `--secondary`, `--cream`, `--sans`, `--heading`), with `clamp()` for responsive sizing and `calc(50% ± offset)` for scattered card layouts.
- Wedding data (names, date, venue) is imported from the `W` constant in `src/pages/Details/index.tsx` rather than re-hardcoded.

## `run`

**File:** `.claude/skills/run/SKILL.md`

Starts the Vite dev server (`npm run dev`, default `http://localhost:5173`) so UI changes can be verified visually in the browser. Use before claiming a visual change works — reports the URL and, when asked, what to check for a given change.

## Adding a new skill

Create `.claude/skills/<name>/SKILL.md` with frontmatter (`name`, `description`, `disable-model-invocation`) and add an entry here so this file stays the index of what's available.
