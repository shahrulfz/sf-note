import MyTextEditor from "@/components/MyTextEditor";
import { NoteStyles } from "@/types/notes/noteTypes";

interface SFNoteEditorParentProps {
  className?: string;
  folders: { id: string; name: string }[];
  title: string;
  note: string;
  noteStyles: NoteStyles;
  folderId: string;
  setTitle: (title: string) => void;
  setNote: (note: string) => void;
  setNoteStyles: (styles: Partial<NoteStyles>) => void;
  setFolderId: (id: string) => void;
  isClick: boolean;
  setIsClick: (click: boolean) => void;
  handleSave: () => void;
  reset: () => void;
  showClearButton?: boolean;
}

export default function SFNoteEditorParent({
  className = "",
  folders,
  title,
  note,
  noteStyles,
  folderId,
  setTitle,
  setNote,
  setNoteStyles,
  setFolderId,
  isClick,
  setIsClick,
  handleSave,
  reset,
  showClearButton = true,
}: SFNoteEditorParentProps) {
  return (
    <div
      className={`${className} relative border border-gray-300 rounded p-4 bg-white shadow-md focus-within:ring-2 focus-within:ring-blue-500 mx-auto`}
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
          {showClearButton && (
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
          )}
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
