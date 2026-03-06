<div align="center">
  <h1>braindump</h1>
  <p><strong>A simple sticky-note board for getting ideas out of your head and keeping them in view.</strong><br />Fast to use, easy to move around, and saved right in your browser.</p>
  <p>
    <code>Sticky Notes</code>
    <code>Infinite Board</code>
    <code>Local Storage</code>
    <code>GitHub Pages Ready</code>
  </p>
</div>

## What It Does

Braindump gives you an infinite wall of notes so you can think in a loose, visual way without losing track of ideas.

- add notes fast
- drag them anywhere
- change colors
- tidy the board when it gets messy
- keep everything saved locally in your browser

## Why It Exists

Some ideas do not belong in folders, forms, or heavy note apps.

Braindump is for quick thoughts, rough plans, random sparks, and things you want to keep in sight without over-organizing them.

## How It Stores Data

Braindump uses `localStorage` with the key `braindump-ideas`.

That means:
- each browser keeps its own notes
- no account is required
- no server or database is involved
- clearing browser storage removes saved notes
- notes do not sync across devices

## Run Locally

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

## Deploy

Braindump is a static Vite app, so it can be hosted on GitHub Pages.

```bash
npm run build
```

Then publish `dist/` using your preferred flow:
- GitHub Actions
- `gh-pages`
- a Pages branch such as `gh-pages`

The app uses a relative Vite base path, so static assets work on GitHub Pages project sites.

## Stack

- React
- TypeScript
- Vite
- Motion
