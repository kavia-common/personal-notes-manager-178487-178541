import React, { useEffect, useMemo, useRef, useState } from 'react';
import { marked } from 'marked';
import type { Note, NotePatch } from '../types';

/**
 * PUBLIC_INTERFACE
 * NoteEditor - Title and content editor with Save/Delete and Markdown preview.
 */
export interface NoteEditorProps {
  note: Note;
  onChange: (patch: NotePatch) => void;
  onDelete: () => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ note, onChange, onDelete }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [preview, setPreview] = useState(false);
  const [dirty, setDirty] = useState(false);
  const saveTimer = useRef<number | undefined>(undefined);

  // Keep local state in sync when switching notes
  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
    setDirty(false);
  }, [note.id]);

  // Debounced auto-save
  useEffect(() => {
    setDirty(true);
    window.clearTimeout(saveTimer.current);
    // @ts-ignore - window.setTimeout returns number in browser
    saveTimer.current = window.setTimeout(() => {
      if (dirty) {
        onChange({ title, content });
        setDirty(false);
      } else {
        onChange({ title, content });
      }
    }, 500);
    return () => window.clearTimeout(saveTimer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, content]);

  // Global save shortcut trigger
  useEffect(() => {
    const listener = () => {
      onChange({ title, content });
      setDirty(false);
    };
    window.addEventListener('notes:save', listener as EventListener);
    return () => window.removeEventListener('notes:save', listener as EventListener);
  }, [title, content, onChange]);

  const html = useMemo(() => {
    try {
      return marked.parse(content || '');
    } catch {
      return '';
    }
  }, [content]);

  return (
    <>
      <div className="editor-head">
        <input
          className="title-input"
          placeholder="Note title..."
          aria-label="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editor-actions">
          <button
            className="btn btn-secondary"
            onClick={() => setPreview(p => !p)}
            aria-pressed={preview}
            aria-label="Toggle Markdown preview"
          >
            {preview ? 'Hide Preview' : 'Preview'}
          </button>
          <button
            className="btn"
            onClick={() => {
              onChange({ title, content });
              setDirty(false);
            }}
            aria-label="Save note (Ctrl/Cmd+S)"
            title="Save (Ctrl/Cmd+S)"
          >
            {dirty ? 'Saving…' : 'Save'}
          </button>
          <button
            className="btn btn-secondary"
            onClick={onDelete}
            style={{ background: 'var(--surface)', color: 'var(--error)', border: '1px solid var(--border)' }}
            aria-label="Delete note"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="content-area">
        {!preview ? (
          <textarea
            className="textarea"
            placeholder="Write your note here... Markdown supported."
            aria-label="Note content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        ) : (
          <div
            className="preview"
            aria-label="Markdown preview"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </div>
    </>
  );
};

export default NoteEditor;
