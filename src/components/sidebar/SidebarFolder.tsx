import { useState } from "react";

export default function SidebarFolder() {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const folders = ["Folder Name 1", "Folder Name 2", "Folder Name 3"];

  return (
    <div className="col-span-2 bg-gray-100 rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold text-gray-700 pl-2">📁 Folders</h2>
      <div className="mt-4 space-y-2">
        {folders.map((folder) => (
          <div
            key={folder}
            className={`py-2 px-4 rounded-lg shadow-sm cursor-pointer transition ${
              selectedFolder === folder
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => setSelectedFolder(folder)}
          >
            {folder}
          </div>
        ))}
      </div>
    </div>
  );
}
