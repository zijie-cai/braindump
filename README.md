# braindump

Braindump is a simple place to put down ideas, keep them in one view, and never lose track of what's on your mind.

It is an infinite wall of sticky notes that feels loose, visual, and fast. No accounts. No backend. No database. Just open it and start pinning thoughts.

## What It Does

- Add ideas quickly
- Drag notes anywhere on the board
- Change note colors
- Reorganize your notes when things get messy
- Keep everything saved in your own browser

## How Data Works

Braindump stores notes in `localStorage` under the key `braindump-ideas`.

That means:
- each person gets their own notes on their own browser
- nothing is shared automatically
- clearing browser storage removes saved notes
- switching devices or browsers does not carry notes over

## Local Development

Requirements: Node.js

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The production build is created in `dist/`.

## Deploy to GitHub Pages

Braindump is now a static Vite app, so GitHub Pages works well for hosting it.

```bash
npm run build
```

Then publish the `dist/` folder to GitHub Pages using your preferred flow:
- GitHub Actions
- `gh-pages`
- manual upload via a Pages-compatible branch

The Vite config uses a relative base path, so the built assets can be served from a GitHub Pages project site.

## Stack

- React
- TypeScript
- Vite
- Motion

## Notes

This project intentionally does not use user accounts or a server. If you want syncing across devices later, the next step is adding a hosted data layer such as Firebase or Supabase.
