import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FolderState } from "@/types/folderTypes";

const useFolderStore = create<FolderState>()(
  persist(
    (set) => ({
      folders: [
        { id: "1", name: "Work Notes" },
        { id: "2", name: "Personal" },
        { id: "3", name: "Ideas" },
      ],
      selectedFolder: null,
      setSelectedFolder: (folderId) => set({ selectedFolder: folderId }),
      addFolder: (name) =>
        set((state) => ({
          folders: [...state.folders, { id: crypto.randomUUID(), name }],
        })),
      removeFolder: (folderId) =>
        set((state) => ({
          folders: state.folders.filter((folder) => folder.id !== folderId),
          selectedFolder:
            state.selectedFolder === folderId ? null : state.selectedFolder,
        })),
    }),
    {
      name: "folder-storage",
    }
  )
);

export default useFolderStore;
