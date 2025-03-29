export interface Folder {
  id: string;
  name: string;
}

export interface FolderState {
  folders: Folder[];
  selectedFolder: string | null;
  setSelectedFolder: (folderId: string) => void;
  addFolder: (name: string) => void;
  removeFolder: (folderId: string) => void;
}
