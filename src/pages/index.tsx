import { useState } from "react";
import MyTextEditor from "@/components/MyTextEditor";
import useNoteStore from "@/stores/notes/useNewNoteStore";
import SidebarFolder from "@/components/sidebar/SidebarFolder";
import useFolderStore from "@/stores/folders/useFolderStore";

export default function SFEditor() {
  const [isClick, setIsClick] = useState(false);
  const { title, note, noteStyles, setTitle, setNote, setNoteStyles, reset } =
    useNoteStore();
  const {
    folders,
    selectedFolder,
    setSelectedFolder,
    addFolder,
    removeFolder,
  } = useFolderStore();

  return (
    <div>
      <p className="pl-8 pt-8 text-lg font-bold">SF Note by Shahrul</p>
      <div className="grid grid-cols-12 mt-12">
        <SidebarFolder
          folders={folders}
          selectedFolder={selectedFolder}
          setSelectedFolder={setSelectedFolder}
          addFolder={addFolder}
          removeFolder={removeFolder}
        />

        {/* Note Taker */}
        <div className="col-span-10">
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
            />
          </div>
        </div>
      </div>
    </div>
  );
}
