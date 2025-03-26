import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NoteStyles {
  isBold: boolean;
  isItalic: boolean;
  fontSize: number;
  color: string;
}

interface NoteState {
  title: string;
  note: string;
  noteStyles: NoteStyles;
  setTitle: (title: string) => void;
  setNote: (note: string) => void;
  setNoteStyles: (styles: Partial<NoteStyles>) => void;
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
      setTitle: (title) => set({ title }),
      setNote: (note) => set({ note }),
      setNoteStyles: (styles) =>
        set((state) => ({ noteStyles: { ...state.noteStyles, ...styles } })),
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
        }),
    }),
    {
      name: "note-storage", // storage key name
    }
  )
);

export default useNoteStore;