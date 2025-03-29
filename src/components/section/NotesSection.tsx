import TrashIcon from "../../icons/TrashIcon";
import useNoteListStore from "@/stores/notes/useNoteListStore";
import useFolderStore from "@/stores/folders/useFolderStore";

export default function NotesSection() {
  const { notesList, deleteNote } = useNoteListStore();
  const { selectedFolder, folders } = useFolderStore();

  // Find the selected folder's name
  const folderName = selectedFolder
    ? folders.find((folder) => folder.id === selectedFolder)?.name ||
      "Unknown Folder"
    : "All Notes";

  // Filter notes based on selected folder (null means "All Folders")
  const filteredNotes = selectedFolder
    ? notesList.filter((note) => note.folderId === selectedFolder)
    : notesList; // Show all notes if selectedFolder is null

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{folderName}</h1>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 w-full max-w-6xl space-y-6">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className="break-inside-avoid p-6 rounded-2xl shadow-lg bg-white backdrop-blur-lg bg-opacity-90 border border-gray-200 hover:scale-105 transition-transform duration-300"
          >
            {/* Title & Trash Icon */}
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">{note.title}</h2>
              <button
                onClick={() => deleteNote(note.id)}
                className="relative group text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
              >
                <TrashIcon size={18} />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 text-white text-xs px-2 py-1 rounded-md">
                  Delete
                </span>
              </button>
            </div>

            {/* Note Content */}
            <div
              className="whitespace-pre-wrap break-words"
              style={{
                fontSize: `${note.noteStyles.fontSize}px`,
                color: note.noteStyles.color,
                fontWeight: note.noteStyles.isBold ? "bold" : "normal",
                fontStyle: note.noteStyles.isItalic ? "italic" : "normal",
              }}
            >
              <p>{note.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
