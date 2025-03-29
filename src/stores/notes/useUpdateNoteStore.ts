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
  selectedNoteId: string;
  setTitle: (title: string) => void;
  setNote: (note: string) => void;
  setNoteStyles: (styles: Partial<NoteStyles>) => void;
  setFolderId: (id: string) => void;
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
      selectedNoteId: "",
      setTitle: (title) => set({ title }),
      setNote: (note) => set({ note }),
      setFolderId: (folderId) => set({ folderId }),
      setSelectedNoteId: (selectedNoteId) => set({ selectedNoteId }),
      setNoteStyles: (styles) =>
        set((state) => ({
          noteStyles: { ...state.noteStyles, ...styles },
        })),
      reset: () =>
        set({
          title: "",
          note: "",
          noteStyles: {
            isBold: false,
            isItalic: false,
            fontSize: 16,
            color: "#000000",
          },
          folderId: "",
        }),
    }),
    {
      name: "update-note-storage",
    }
  )
);

export default useUpdateNoteStore;
