import React, { useCallback } from 'react';

// PUBLIC_INTERFACE
export default function NoteEditor({ note, onChange, onDelete }) {
  /** Editor for a single note with title and content fields. */
  const onTitle = useCallback((e) => onChange({ title: e.target.value }), [onChange]);
  const onContent = useCallback((e) => onChange({ content: e.target.value }), [onChange]);

  if (!note) return null;

  return (
    <>
      <div className="editor-header">
        <input
          className="input"
          placeholder="Note title"
          value={note.title}
          onChange={onTitle}
          aria-label="Note title"
        />
        <button className="btn-danger btn" onClick={onDelete} aria-label="Delete note">Delete</button>
      </div>
      <div style={{ padding: 14 }}>
        <textarea
          className="textarea"
          placeholder="Write your note..."
          value={note.content}
          onChange={onContent}
          aria-label="Note content"
        />
      </div>
    </>
  );
}
