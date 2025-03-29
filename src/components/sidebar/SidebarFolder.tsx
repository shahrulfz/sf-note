import { useState } from "react";

interface Folder {
  id: string;
  name: string;
}

interface SidebarFolderProps {
  folders: Folder[];
  selectedFolder: string | null;
  setSelectedFolder: (folderId: string | null) => void;
  addFolder: (folderName: string) => void;
  removeFolder: (folderId: string) => void;
}

export default function SidebarFolder({
  folders,
  selectedFolder,
  setSelectedFolder,
  addFolder,
  removeFolder,
}: SidebarFolderProps) {
  const [newFolderName, setNewFolderName] = useState("");

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      addFolder(newFolderName);
      setNewFolderName("");
    }
  };

  return (
    <div className="col-span-2 bg-gray-100 rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold text-gray-700 pl-2">📁 Folders</h2>

      {/* New Folder Input */}
      <div className="mt-4 relative flex items-center bg-white py-2 px-4 rounded-lg shadow-sm border border-gray-300">
        <input
          type="text"
          placeholder="New folder name"
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          className="w-full outline-none bg-transparent"
        />
        <button
          className="relative text-blue-500 hover:text-blue-700 cursor-pointer group text-2xl"
          onClick={handleAddFolder}
        >
          +
          <span className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-700 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap">
            Add folder
          </span>
        </button>
      </div>

      {/* "All Folders" Option */}
      <div className="mt-4 space-y-2">
        <div
          className={`flex items-center justify-between py-2 px-4 rounded-lg shadow-sm cursor-pointer transition ${
            selectedFolder === null
              ? "bg-blue-500 text-white"
              : "hover:bg-yellow-200"
          }`}
          onClick={() => setSelectedFolder(null)}
        >
          <span>All Folders</span>
        </div>

        {/* Other Folders */}
        {folders.map((folder) => (
          <div
            key={folder.id}
            className={`flex items-center justify-between py-2 px-4 rounded-lg shadow-sm cursor-pointer transition ${
              selectedFolder === folder.id
                ? "bg-blue-500 text-white"
                : "hover:bg-yellow-200"
            }`}
            onClick={() => setSelectedFolder(folder.id)}
          >
            <span>{folder.name}</span>
            <button
              className="relative text-red-500 hover:text-red-700 cursor-pointer group"
              onClick={(e) => {
                e.stopPropagation();
                removeFolder(folder.id);
              }}
            >
              ✕
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-700 text-white text-xs rounded-md px-2 py-1 whitespace-nowrap">
                Remove folder
              </span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
