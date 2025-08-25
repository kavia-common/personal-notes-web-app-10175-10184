import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { load, save } from '../utils/storage';
import { useAuth } from './AuthContext';

const NotesCtx = createContext(null);

// PUBLIC_INTERFACE
export function NotesProvider({ children }) {
  /**
   * PUBLIC_INTERFACE
   * Manages notes list, selection, search, and CRUD with localStorage persistence.
   * Notes schema: { id, title, content, updatedAt }
   */
  const { user } = useAuth();

  const storageKey = user ? `notes:${user.email}` : 'notes:guest';

  const [notes, setNotes] = useState(() => {
    const existing = load(storageKey, null);
    if (existing && Array.isArray(existing)) return existing;
    // seed with an example note
    return [
      {
        id: uuid(),
        title: 'Welcome to Notes',
        content: 'This is your first note. Use the New button to create more.',
        updatedAt: Date.now(),
      },
    ];
  });
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Persist notes on change
  useEffect(() => {
    save(storageKey, notes);
  }, [notes, storageKey]);

  // When user changes, load that user's notes
  useEffect(() => {
    const next = load(storageKey, []);
    setNotes(Array.isArray(next) ? next : []);
    setSelectedNoteId(null);
  }, [storageKey]);

  const filteredNotes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [...notes].sort((a, b) => b.updatedAt - a.updatedAt);
    return [...notes]
      .filter(n => (n.title || '').toLowerCase().includes(q) || (n.content || '').toLowerCase().includes(q))
      .sort((a, b) => b.updatedAt - a.updatedAt);
  }, [notes, searchQuery]);

  const selectedNote = useMemo(() => notes.find(n => n.id === selectedNoteId) || null, [notes, selectedNoteId]);

  const createNote = useCallback(() => {
    const id = uuid();
    const now = Date.now();
    const newNote = { id, title: 'Untitled', content: '', updatedAt: now };
    setNotes(prev => [newNote, ...prev]);
    return id;
  }, []);

  const updateNote = useCallback((id, patch) => {
    setNotes(prev =>
      prev.map(n => (n.id === id ? { ...n, ...patch, updatedAt: Date.now() } : n))
    );
  }, []);

  const deleteNote = useCallback((id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    if (selectedNoteId === id) setSelectedNoteId(null);
  }, [selectedNoteId]);

  const clearAll = useCallback(() => {
    setNotes([]);
    setSelectedNoteId(null);
  }, []);

  const value = useMemo(
    () => ({
      notes,
      filteredNotes,
      searchQuery,
      setSearchQuery,
      selectedNote,
      selectNoteId: selectedNoteId,
      setSelectedNoteId,
      createNote,
      updateNote,
      deleteNote,
      clearAll,
    }),
    [notes, filteredNotes, searchQuery, selectedNote, selectedNoteId, createNote, updateNote, deleteNote, clearAll]
  );

  return <NotesCtx.Provider value={value}>{children}</NotesCtx.Provider>;
}

// PUBLIC_INTERFACE
export function useNotes() {
  /** Access notes state and CRUD actions. */
  const ctx = useContext(NotesCtx);
  if (!ctx) throw new Error('useNotes must be used within NotesProvider');
  return ctx;
}
