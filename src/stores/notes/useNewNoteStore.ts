import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NoteStyles } from "@/types/notes/noteTypes";

interface NoteState {
  title: string;
  note: string;
  noteStyles: NoteStyles;
  folderId: string;
  setTitle: (title: string) => void;
  setNote: (note: string) => void;
  setNoteStyles: (styles: Partial<NoteStyles>) => void;
  setFolderId: (id: string) => void;
  reset: () => void;
}

const useNoteStore = create<NoteState>()(
  persist(
    (set) => ({
      title: "",
      note: "",
      noteStyles: {
        isBold: false,
        isItalic: false,
        fontSize: 16,
        color: "#000000",
      },
      folderId: "",
      setTitle: (title) => set({ title }),
      setNote: (note) => set({ note }),
      setNoteStyles: (styles) =>
        set((state) => ({ noteStyles: { ...state.noteStyles, ...styles } })),
      setFolderId: (folderId) => set({ folderId }),
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
      name: "single-note-storage",
    }
  )
);

export default useNoteStore;
