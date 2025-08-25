# Notes App (React)

A modern, minimalistic personal notes application built with React.
It supports simple authentication UI, creating/editing/deleting notes, search, and a responsive layout.

## Features

- User authentication UI (login, signup, logout) — client-side only demo
- Create, read, update, and delete personal notes
- Full-text search (title and content)
- Responsive layout: header, notes list (sidebar), editor
- Light theme
- Theme colors: primary `#1976d2`, secondary `#424242`, accent `#ffeb3b`
- Uses `.env` for configuration (see `.env.example`)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and customize if needed:
   ```bash
   cp .env.example .env
   ```
3. Start the app:
   ```bash
   npm start
   ```

## Configuration

- `REACT_APP_APP_TITLE`: Title shown in the header (default: "Notes")
- `REACT_APP_API_BASE_URL`: Reserved for future backend integration. Current app uses localStorage.

## Data and Persistence

- Notes and the "user" are stored in `localStorage`. This keeps the demo fully client-side.
- When you sign-in or sign-up, your notes are stored per-email (namespace isolates by email).

## Code Structure

- `src/context/AuthContext.js` — Authentication state (demo only, no server)
- `src/context/NotesContext.js` — Notes state, CRUD, search, selection, persistence
- `src/components/NotesList.js` — Sidebar list
- `src/components/NoteEditor.js` — Editor pane
- `src/components/auth/AuthModal.js` — Auth modal
- `src/utils/storage.js` — localStorage helpers
- `src/App.js` — App shell, routes, header, layout
- `src/App.css` — Theme and layout styles

## Replacing Auth with a Real Backend

- Replace `AuthContext` login/signup/logout with API calls using `REACT_APP_API_BASE_URL`.
- Replace `NotesContext` CRUD operations with API requests and remove localStorage helpers.

## License

MIT
