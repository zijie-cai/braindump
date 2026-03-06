<div align="center">
  <h1>braindump</h1>
  <p><strong>A simple sticky-note board for getting ideas out of your head and keeping them in view.</strong><br />Open it, drop thoughts in, move them around, and never lose track.</p>
  <p>
    <code>Sticky Notes</code>
    <code>Infinite Board</code>
    <code>Local Storage</code>
    <code>GitHub Pages Ready</code>
  </p>
</div>

> Loose enough for messy thinking. Simple enough to use every day.

## Why Braindump

Some ideas are too early for documents and too important for scraps.

Braindump gives you one visual place to catch thoughts fast, keep them visible, and reshape them as they grow.

No folders. No setup. No account. Just a board and your brain.

## What It Does

- add notes fast
- drag notes anywhere on an infinite board
- change colors as ideas take shape
- clean up the layout when the board gets chaotic
- save everything locally in the browser

## Local-First

Braindump stores notes in `localStorage` under `braindump-ideas`.

- each browser keeps its own notes
- no server or database is required
- no account is required
- clearing browser storage removes saved notes
- notes do not sync across devices

## Quick Start

Requirements: Node.js

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The production output is generated in `dist/`.

## Deploy to GitHub Pages

Braindump is a static Vite app, so it can be hosted on GitHub Pages.

```bash
npm run build
```

Then publish the built output from `dist/` using your preferred flow:
- GitHub Actions
- `gh-pages`
- a Pages branch such as `gh-pages`

Do not deploy the repo root directly. GitHub Pages needs the compiled files from `dist/`.

## Stack

- React
- TypeScript
- Vite
- Motion
