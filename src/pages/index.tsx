import { useState } from "react";
import MyTextEditor from "@/components/MyTextEditor";

export default function CustomEditor() {
  const [isClick, setIsClick] = useState<boolean>(false);
  const [noteData, setNoteData] = useState<{ title: string; note: string }>({
    title: "",
    note: "",
  });

  return (
    <div className="p-8">
      <p className="text-lg font-bold">SF Note by Shahrul</p>
      <div className="flex justify-center">
        <div
          className="relative mt-10 border border-gray-300 rounded p-4 w-2/5 bg-white shadow-md focus-within:ring-2 focus-within:ring-blue-500"
          onClick={() => !isClick && setIsClick(true)}
        >
          {/* Title Input */}
          {isClick && (
            <div className="relative mb-2">
              <input
                name="title"
                placeholder="Title"
                className="w-full py-2 border-b outline-none"
                aria-label="Title input"
                value={noteData.title}
                onChange={(e) =>
                  setNoteData({ ...noteData, title: e.target.value })
                }
              />
              <button
                className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full hover:bg-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsClick(false);
                  setNoteData({ title: "", note: "Write a note..." });
                }}
                aria-label="Close title input"
              >
                ✕
              </button>
            </div>
          )}

          {/* Rich Text Editor Component */}
          <MyTextEditor
            value={noteData.note}
            isClick={isClick}
            onChange={(value) => setNoteData({ ...noteData, note: value })}
          />
        </div>
      </div>
    </div>
  );
}
