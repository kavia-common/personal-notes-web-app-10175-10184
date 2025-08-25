import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import NotesList from './components/NotesList';
import NoteEditor from './components/NoteEditor';
import AuthModal from './components/auth/AuthModal';
import { NotesProvider, useNotes } from './context/NotesContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// PUBLIC_INTERFACE
function AppShell() {
  /** Main application shell with header, sidebar list, and editor. */
  const { user } = useAuth();
  const { notes, selectNoteId, selectedNote, setSelectedNoteId, filteredNotes, searchQuery, setSearchQuery, createNote, updateNote, deleteNote, clearAll } = useNotes();
  const [authOpen, setAuthOpen] = useState(false);

  // Initialize selection
  useEffect(() => {
    if (!selectedNote && filteredNotes.length > 0) {
      setSelectedNoteId(filteredNotes[0].id);
    }
  }, [filteredNotes, selectedNote, setSelectedNoteId]);

  const handleCreate = () => {
    const newId = createNote();
    setSelectedNoteId(newId);
  };

  const title = process.env.REACT_APP_APP_TITLE || 'Notes';

  return (
    <div className="app-shell">
      <div className="header">
        <div className="header-inner">
          <div className="brand" aria-label="App Brand">
            <div className="dot" />
            <div>{title}</div>
          </div>
          <div className="search" role="search">
            <span role="img" aria-label="search">🔎</span>
            <input
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search notes"
            />
          </div>
          <div className="header-actions">
            {user ? (
              <>
                <span className="user-chip" title={user.email}>{user.email}</span>
                <button className="btn" onClick={() => setAuthOpen(true)}>Account</button>
              </>
            ) : (
              <button className="btn-primary btn" onClick={() => setAuthOpen(true)}>Sign in</button>
            )}
          </div>
        </div>
      </div>

      <div className="content">
        <aside className="sidebar" aria-label="Notes list panel">
          <div className="sidebar-header">
            <strong>My Notes</strong>
            <div className="row">
              <button className="btn" onClick={handleCreate}>New</button>
              <button className="btn" title="Remove all notes" onClick={clearAll}>Clear</button>
            </div>
          </div>
          <NotesList
            notes={filteredNotes}
            selectedId={selectNoteId}
            onSelect={(id) => setSelectedNoteId(id)}
          />
        </aside>

        <main className="editor" aria-label="Editor panel">
          {selectedNote ? (
            <NoteEditor
              key={selectedNote.id}
              note={selectedNote}
              onChange={(patch) => updateNote(selectedNote.id, patch)}
              onDelete={() => {
                const currentId = selectedNote.id;
                deleteNote(currentId);
              }}
            />
          ) : (
            <div style={{ padding: 18 }}>
              <h3>Welcome</h3>
              <p className="helper">Create a note to get started, or select one from the list.</p>
            </div>
          )}
        </main>
      </div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  /** Root component that wires providers and routes. */
  return (
    <AuthProvider>
      <NotesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppShell />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </NotesProvider>
    </AuthProvider>
  );
}

export default App;
