import { useRef, useEffect, ChangeEvent, useState } from "react";

interface TextEditorProps {
  value: string;
  isClick: boolean;
  onChange: (value: string) => void;
  noteStyles: {
    isBold: boolean;
    isItalic: boolean;
    fontSize: number;
    color: string;
  };
  setNoteStyles: (styles: Partial<TextEditorProps["noteStyles"]>) => void;
}

export default function MyTextEditor({
  isClick,
  value,
  onChange,
  noteStyles,
  setNoteStyles,
}: TextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedFolder, setSelectedFolder] = useState<string>("");

  useEffect(() => {
    autoResize();
  }, [value]); // Run autoResize when the note changes

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    autoResize();
  };

  const autoResize = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSave = () => {
    console.log("Note saved to:", selectedFolder, "Content:", value);
  };

  return (
    <div className="w-full">
      {/* Toolbar */}
      {isClick && (
        <div className="mb-2 flex space-x-2 pb-2">
          <button
            className={`w-10 px-3 py-1 rounded cursor-pointer transition text-center ${
              noteStyles.isBold ? "bg-gray-400" : "hover:bg-gray-200"
            }`}
            onClick={() => setNoteStyles({ isBold: !noteStyles.isBold })}
          >
            B
          </button>
          <button
            className={`w-10 px-3 py-1 rounded cursor-pointer transition text-center ${
              noteStyles.isItalic ? "bg-gray-400" : "hover:bg-gray-200"
            }`}
            onClick={() => setNoteStyles({ isItalic: !noteStyles.isItalic })}
          >
            I
          </button>
          <input
            type="number"
            className="w-14 p-1 rounded border border-gray-300 text-center"
            value={noteStyles.fontSize}
            onChange={(e) =>
              setNoteStyles({ fontSize: Number(e.target.value) })
            }
          />
          <input
            type="color"
            className="w-10 h-10 rounded border border-gray-300"
            value={noteStyles.color}
            onChange={(e) => setNoteStyles({ color: e.target.value })}
          />
        </div>
      )}

      {/* Folder Selection */}
      <select
        className="mb-2 p-2 border border-gray-300 rounded bg-white"
        value={selectedFolder}
        onChange={(e) => setSelectedFolder(e.target.value)}
      >
        <option value="">Select Folder</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Ideas">Ideas</option>
      </select>

      <div
        className="w-full py-2 outline-none"
        style={{
          fontSize: `${noteStyles.fontSize}px`,
          color: noteStyles.color,
          fontWeight: noteStyles.isBold ? "bold" : "normal",
          fontStyle: noteStyles.isItalic ? "italic" : "normal",
        }}
      >
        <textarea
          ref={textareaRef}
          name="note"
          placeholder="Write a note"
          className="w-full outline-none resize-none overflow-hidden bg-transparent"
          aria-label="Note input"
          value={value}
          onChange={handleChange}
          rows={1}
          style={{
            fontSize: `${noteStyles.fontSize}px`,
            color: noteStyles.color,
            fontWeight: noteStyles.isBold ? "bold" : "normal",
            fontStyle: noteStyles.isItalic ? "italic" : "normal",
          }}
        />
      </div>

      {/* Save Button */}
      <button
        className="mt-2 px-4 py-2 rounded border border-gray-400 bg-transparent hover:bg-gray-200 transition"
        onClick={handleSave}
        disabled={!selectedFolder}
      >
        Save Note
      </button>
    </div>
  );
}
