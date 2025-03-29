import { useEffect, useState } from "react";
import useUpdateNoteStore from "@/stores/notes/useUpdateNoteStore";
import NoteTaker from "@/components/SFNoteEditorParent";
import useFolderStore from "@/stores/folders/useFolderStore";
import useNoteListStore from "@/stores/notes/useNoteListStore";
import { Note } from "@/types/notes/noteTypes";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SelectedModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const {
    selectedNoteId,
    title,
    note,
    noteStyles,
    folderId,
    setTitle,
    setNote,
    setNoteStyles,
    setFolderId,
    reset,
  } = useUpdateNoteStore();

  const { folders } = useFolderStore();
  const { notesList, updateNote } = useNoteListStore();
  const [isClick, setIsClick] = useState(true);

  const handleSave = () => {
    updateNote(selectedNoteId, { title, note, noteStyles, folderId });

    onClose();
    reset();
  };

  useEffect(() => {
    if (selectedNoteId) {
      const foundNote = notesList.find((note) => note.id === selectedNoteId);

      if (foundNote) {
        setTitle(foundNote.title);
        setNote(foundNote.note);
        setNoteStyles(foundNote.noteStyles);
        setFolderId(foundNote.folderId);
      } else {
        reset();
      }
    }
  }, [
    selectedNoteId,
    notesList,
    setTitle,
    setNote,
    setNoteStyles,
    setFolderId,
    reset,
  ]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-300/70">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-3xl relative">
        <p className="font-bold text-2xl">Edit Note</p>
        <div className="mb-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full hover:cursor-pointer transition duration-200 mr-4"
            aria-label="Close"
          >
            <span className="text-2xl font-bold text-gray-500 hover:text-red-600">
              &times;
            </span>
          </button>
        </div>
        <NoteTaker
          folders={folders}
          title={title}
          note={note}
          noteStyles={noteStyles}
          folderId={folderId}
          setTitle={setTitle}
          setNote={setNote}
          setNoteStyles={setNoteStyles}
          setFolderId={setFolderId}
          reset={reset}
          handleSave={handleSave}
          isClick={isClick}
          setIsClick={setIsClick}
          showClearButton={false}
        />
      </div>
    </div>
  );
};

export default SelectedModal;
