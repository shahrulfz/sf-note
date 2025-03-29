import { create } from "zustand";
import { persist } from "zustand/middleware";

type SelectedModalState = {
  isOpen: boolean;
  openSelectedModal: () => void;
  closeSelectedModal: () => void;
};

const useSelectedModalStore = create(
  persist<SelectedModalState>(
    (set) => ({
      isOpen: false,
      openSelectedModal: () => set({ isOpen: true }),
      closeSelectedModal: () => set({ isOpen: false }),
    }),
    { name: "selected-modal-store" }
  )
);

export default useSelectedModalStore;
