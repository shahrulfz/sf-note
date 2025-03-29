import { Note } from "@/types/notes/noteTypes";

interface NotesSectionProps {
  notesList: Note[];
}

export default function NotesSection({ notesList }: NotesSectionProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Notelist</h1>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 w-full max-w-6xl space-y-6">
        {notesList?.map((note) => (
          <div
            key={note.id}
            className="break-inside-avoid p-6 rounded-2xl shadow-lg bg-white backdrop-blur-lg bg-opacity-90 border border-gray-200 hover:scale-105 transition-transform duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
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
