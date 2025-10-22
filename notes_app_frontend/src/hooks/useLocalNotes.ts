import { useCallback, useEffect, useState } from 'react';
import type { Note, NotePatch } from '../types';

const STORAGE_KEY = 'ocean-notes-v1';

/**
 * PUBLIC_INTERFACE
 * useLocalNotes - CRUD operations for notes persisted in localStorage.
 */
export function useLocalNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  // Load from storage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setNotes(parsed);
        }
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // Persist to storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {
      // ignore quota errors
    }
  }, [notes]);

  const createNote = useCallback((): Note => {
    const n: Note = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
      title: '',
      content: '',
      updatedAt: Date.now(),
    };
    setNotes(prev => [n, ...prev]);
    return n;
  }, []);

  const updateNote = useCallback((id: string, patch: NotePatch) => {
    setNotes(prev =>
      prev
        .map(n => (n.id === id ? { ...n, ...patch, updatedAt: Date.now() } : n))
        .sort((a, b) => b.updatedAt - a.updatedAt)
    );
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  }, []);

  return { notes, createNote, updateNote, deleteNote };
}
