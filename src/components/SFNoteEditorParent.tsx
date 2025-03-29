import { useState } from "react";
import MyTextEditor from "@/components/MyTextEditor";
import useNoteStore from "@/stores/notes/useNewNoteStore";
import useNoteListStore from "@/stores/notes/useNoteListStore";

interface NoteTakerProps {
  folders: { id: string; name: string }[];
}

interface ChildProps {
  onSave: () => void;
}

export default function NoteTaker({ folders }: NoteTakerProps) {
  const [isClick, setIsClick] = useState(false);
  const {
    title,
    note,
    noteStyles,
    folderId,
    setTitle,
    setNote,
    setNoteStyles,
    setFolderId,
    reset,
  } = useNoteStore();
  const { addNote } = useNoteListStore();

  const handleSave = () => {
    addNote({ title, note, noteStyles, folderId });
  };

  return (
    <div
      className="relative border border-gray-300 rounded p-4 w-1/2 bg-white shadow-md focus-within:ring-2 focus-within:ring-blue-500 mx-auto mt-10"
      onClick={() => !isClick && setIsClick(true)}
    >
      {isClick && (
        <div className="relative mb-2">
          <input
            name="title"
            placeholder="Title"
            className="w-full py-2 border-b outline-none"
            aria-label="Title input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="absolute top-0 right-0 hover:text-white text-xs px-2 py-1 rounded-full hover:bg-red-600 hover:cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsClick(false);
              reset();
            }}
            aria-label="Close title input"
          >
            ✕
          </button>
        </div>
      )}

      <MyTextEditor
        value={note}
        isClick={isClick}
        onChange={setNote}
        noteStyles={noteStyles}
        setNoteStyles={setNoteStyles}
        folders={folders}
        folderId={folderId}
        setFolderId={setFolderId}
        handleSave={handleSave}
      />
    </div>
  );
}
