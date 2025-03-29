import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Note } from "@/types/notes/noteTypes";

interface NoteState {
  notesList: Note[];
  addNote: (note: Omit<Note, "id">) => void; // Remove "id" from required props
  updateNote: (id: string, updatedNote: Partial<Note>) => void;
  deleteNote: (id: string) => void;
}

const useNoteListStore = create<NoteState>()(
  persist(
    (set) => ({
      notesList: [],
      addNote: (note) =>
        set((state) => ({
          notesList: [...state.notesList, { ...note, id: crypto.randomUUID() }],
        })),
      updateNote: (id, updatedNote) =>
        set((state) => ({
          notesList: state.notesList.map((note) =>
            note.id === id ? { ...note, ...updatedNote } : note
          ),
        })),
      deleteNote: (id) =>
        set((state) => ({
          notesList: state.notesList.filter((note) => note.id !== id),
        })),
    }),
    {
      name: "notes-list-storage",
    }
  )
);

export default useNoteListStore;
