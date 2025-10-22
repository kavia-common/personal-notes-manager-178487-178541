import React, { useMemo } from 'react';
import NoteList from './NoteList';
import { relativeTimeFromEpoch } from '../utils/time';
import type { Note } from '../types';

/**
 * PUBLIC_INTERFACE
 * Sidebar - shows search input and sorted, filtered list of notes.
 */
export interface SidebarProps {
  notes: Note[];
  query: string;
  onQueryChange: (q: string) => void;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  notes,
  query,
  onQueryChange,
  selectedId,
  onSelect,
}) => {
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q.length
      ? notes.filter(n =>
          n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
        )
      : notes;
    return [...list].sort((a, b) => b.updatedAt - a.updatedAt);
  }, [notes, query]);

  return (
    <>
      <div className="sidebar-header">
        <label htmlFor="search" style={{ display: 'block', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
          Search notes
        </label>
        <input
          id="search"
          className="search"
          placeholder="Search by title or content..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Search notes"
        />
      </div>
      <div className="sidebar-list" role="list" aria-label="Notes list">
        {filtered.length === 0 ? (
          <div className="empty-state" style={{ margin: 8 }}>
            No matching notes
          </div>
        ) : (
          <NoteList
            notes={filtered}
            selectedId={selectedId}
            onSelect={onSelect}
            renderMeta={(n) => relativeTimeFromEpoch(n.updatedAt)}
          />
        )}
      </div>
    </>
  );
};

export default Sidebar;
