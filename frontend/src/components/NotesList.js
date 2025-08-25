import React from 'react';

// PUBLIC_INTERFACE
export default function NotesList({ notes, selectedId, onSelect }) {
  /** Renders a vertical list of notes with title and date. */
  if (!notes || notes.length === 0) {
    return <div className="note-list" style={{ padding: 14, color: '#6b7280' }}>No notes yet.</div>;
  }
  return (
    <div className="note-list" role="list">
      {notes.map((n) => (
        <div
          key={n.id}
          role="listitem"
          className={`note-item ${selectedId === n.id ? 'active' : ''}`}
          onClick={() => onSelect(n.id)}
        >
          <div className="note-title">{n.title || 'Untitled'}</div>
          <div className="note-meta">
            {new Date(n.updatedAt).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
}
