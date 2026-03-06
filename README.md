<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your app

This is now a static Vite app that stores notes in each user's browser using `localStorage`.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

## Data storage

- Notes are stored locally in the browser under the `braindump-ideas` key.
- Each browser/device keeps its own separate data.
- Clearing browser storage will remove saved notes.

## Deploy to GitHub Pages

1. Build the app:
   `npm run build`
2. Deploy the generated `dist/` folder to GitHub Pages.

Because the Vite config uses a relative base path, the built app can be hosted from a GitHub Pages project site without needing a custom asset path.
