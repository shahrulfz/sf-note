import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NoteStyles } from "@/types/notes/noteTypes";

const defaultNoteStyles: NoteStyles = {
  isBold: false,
  isItalic: false,
  fontSize: 16,
  color: "#000000",
};

interface NoteState {
  title: string;
  note: string;
  noteStyles: NoteStyles;
  folderId: string;
  previousNoteId: string;
  selectedNoteId: string;
  hasUnsavedChanges: boolean;
  setTitle: (title: string) => void;
  setNote: (note: string) => void;
  setNoteStyles: (styles: Partial<NoteStyles>) => void;
  setFolderId: (id: string) => void;
  setPreviousNoteId: (id: string) => void;
  setSelectedNoteId: (id: string) => void;
  reset: () => void;
}

const useUpdateNoteStore = create<NoteState>()(
  persist(
    (set) => ({
      title: "",
      note: "",
      noteStyles: defaultNoteStyles,
      folderId: "",
      previousNoteId: "",
      selectedNoteId: "",
      hasUnsavedChanges: false,

      setTitle: (title) => set({ title, hasUnsavedChanges: true }),
      setNote: (note) => set({ note, hasUnsavedChanges: true }),
      setFolderId: (folderId) => set({ folderId, hasUnsavedChanges: true }),

      setPreviousNoteId: (previousNoteId) => set({ previousNoteId }),
      setSelectedNoteId: (selectedNoteId) => set({ selectedNoteId }),

      setNoteStyles: (styles) =>
        set((state) => ({
          noteStyles: { ...state.noteStyles, ...styles },
          hasUnsavedChanges: true,
        })),

      reset: () =>
        set({
          title: "",
          note: "",
          noteStyles: defaultNoteStyles,
          folderId: "",
          previousNoteId: "",
          selectedNoteId: "",
          hasUnsavedChanges: false,
        }),
    }),
    {
      name: "update-note-storage",
    }
  )
);

export default useUpdateNoteStore;
