import React from 'react';
import type { Note } from '../types';

/**
 * PUBLIC_INTERFACE
 * NoteList - Renders list of notes and handles selection.
 */
export interface NoteListProps {
  notes: Note[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  renderMeta?: (note: Note) => React.ReactNode;
}

const NoteList: React.FC<NoteListProps> = ({ notes, selectedId, onSelect, renderMeta }) => {
  return (
    <>
      {notes.map((n) => (
        <button
          key={n.id}
          className={`note-item ${selectedId === n.id ? 'active' : ''}`}
          onClick={() => onSelect(n.id)}
          aria-current={selectedId === n.id ? 'true' : undefined}
          role="listitem"
          title={n.title || 'Untitled note'}
        >
          <div className="note-title">{n.title || 'Untitled'}</div>
          <div className="note-meta">{renderMeta ? renderMeta(n) : null}</div>
        </button>
      ))}
    </>
  );
};

export default NoteList;
