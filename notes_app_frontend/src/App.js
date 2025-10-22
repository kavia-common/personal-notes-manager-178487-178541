import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './index.css';
import { useLocalNotes } from './hooks/useLocalNotes';
import NavBar from './components/NavBar';
import Sidebar from './components/Sidebar';
import NoteEditor from './components/NoteEditor';

/**
 * PUBLIC_INTERFACE
 * App - Main shell combining NavBar, Sidebar, and NoteEditor with Ocean Professional theme.
 * Manages selected note ID and mobile sidebar visibility.
 */
function App() {
  const {
    notes,
    createNote,
    updateNote,
    deleteNote,
  } = useLocalNotes();

  const [selectedId, setSelectedId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState('');

  // Ensure a note is selected if exists
  useEffect(() => {
    if (notes.length > 0) {
      if (!selectedId || !notes.find(n => n.id === selectedId)) {
        setSelectedId(notes[0].id);
      }
    } else {
      setSelectedId(null);
    }
  }, [notes, selectedId]);

  const selectedNote = useMemo(
    () => notes.find(n => n.id === selectedId) || null,
    [notes, selectedId]
  );

  const onCreateNew = useCallback(() => {
    const n = createNote();
    setSelectedId(n.id);
    setSidebarOpen(false);
  }, [createNote]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      const isSave = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's';
      const isNew = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'n';
      if (isSave) {
        e.preventDefault();
        // explicit save is handled inside editor; here we could trigger blur or noop
        // We dispatch a custom event to prompt editor save if needed.
        window.dispatchEvent(new CustomEvent('notes:save'));
      } else if (isNew) {
        e.preventDefault();
        onCreateNew();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onCreateNew]);

  return (
    <div className="app-shell">
      <nav className="navbar" aria-label="Top navigation">
        <div className="navbar-inner">
          <div className="brand" role="img" aria-label="Ocean Professional brand">
            <div className="brand-logo" />
            <div className="brand-title">Ocean Notes</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              className="btn btn-secondary"
              aria-label="Toggle sidebar"
              onClick={() => setSidebarOpen(s => !s)}
            >
              ☰
              <span className="sr-only">Toggle sidebar</span>
            </button>
            <button
              className="btn"
              onClick={onCreateNew}
              aria-label="Create a new note (Ctrl/Cmd+N)"
              title="New note (Ctrl/Cmd+N)"
            >
              ＋ New Note
            </button>
          </div>
        </div>
      </nav>

      <div className="layout">
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`} aria-label="Sidebar with notes and search">
          <Sidebar
            notes={notes}
            query={query}
            onQueryChange={setQuery}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </aside>

        <main className="main" aria-label="Main editor area">
          {selectedNote ? (
            <NoteEditor
              key={selectedNote.id}
              note={selectedNote}
              onChange={(patch) => updateNote(selectedNote.id, patch)}
              onDelete={() => {
                if (window.confirm('Delete this note? This cannot be undone.')) {
                  deleteNote(selectedNote.id);
                }
              }}
            />
          ) : (
            <div className="empty-state">
              <div style={{ fontWeight: 600, marginBottom: 6 }}>No notes yet</div>
              <div style={{ marginBottom: 12 }}>
                Create your first note to get started. Your notes auto-save and are stored locally.
              </div>
              <button className="btn" onClick={onCreateNew}>＋ Create a Note</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
