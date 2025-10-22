# Ocean Notes – React Frontend

A modern, minimalist notes application frontend following the Ocean Professional theme.

## Features

- Create, edit, delete personal notes
- Local persistence via `localStorage` (no backend required)
- Search and filter by title/content
- Sort by last updated (descending)
- Auto-save on pause (~500ms) and explicit Save button
- Keyboard shortcuts: Ctrl/Cmd+S (save), Ctrl/Cmd+N (new note)
- Optional Markdown preview in editor
- Responsive layout with top navigation, left sidebar, and main editor
- Accessible labels and focus states

## Getting Started

Install dependencies and run the app:

```bash
npm install
npm start
```

The app runs at http://localhost:3000.

## Project Structure

- `src/components/NavBar.tsx` – top navigation bar
- `src/components/Sidebar.tsx` – search and list of notes
- `src/components/NoteList.tsx` – renders note items
- `src/components/NoteEditor.tsx` – editor with preview, save, delete
- `src/hooks/useLocalNotes.ts` – localStorage CRUD hook
- `src/types.ts` – TypeScript types for notes
- `src/utils/time.ts` – relative time utility
- `src/index.css` – Ocean Professional theme and layout styles
- `src/App.js` – application shell wiring all components

## Theme – Ocean Professional

- Primary: `#2563EB` (blue)
- Secondary/Success: `#F59E0B` (amber)
- Error: `#EF4444`
- Background: `#f9fafb`, Surface: `#ffffff`, Text: `#111827`
- Modern styling with subtle shadows, rounded corners, smooth transitions, and subtle gradients

## Notes on Persistence

All data is stored locally in the browser under the key `ocean-notes-v1`. Clearing browser storage will remove notes.

## Environment

No environment variables are required. See `.env.example` for optional feature flags.
