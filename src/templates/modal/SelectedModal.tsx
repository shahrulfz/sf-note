import { useEffect, useState } from "react";
import useUpdateNoteStore from "@/stores/notes/useUpdateNoteStore";
import SFNoteEditorParent from "@/components/SFNoteEditorParent";
import useFolderStore from "@/stores/folders/useFolderStore";
import useNoteListStore from "@/stores/notes/useNoteListStore";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SelectedModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
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
    previousNoteId,
    setPreviousNoteId,
  } = useUpdateNoteStore();

  const { folders } = useFolderStore();
  const { notesList, updateNote } = useNoteListStore();
  const [isClick, setIsClick] = useState(true);

  useEffect(() => {
    if (selectedNoteId !== previousNoteId) {
      setPreviousNoteId(selectedNoteId);
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
    previousNoteId,
    notesList,
    setTitle,
    setNote,
    setNoteStyles,
    setFolderId,
    reset,
    setPreviousNoteId,
  ]);

  const handleSave = () => {
    updateNote(selectedNoteId, { title, note, noteStyles, folderId });
    onClose();
    reset();
  };

  if (!isOpen) return null;

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
        <SFNoteEditorParent
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
