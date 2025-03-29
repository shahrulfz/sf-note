export interface NoteStyles {
  isBold: boolean;
  isItalic: boolean;
  fontSize: number;
  color: string;
}

export interface Note {
  id: string;
  title: string;
  note: string;
  noteStyles: NoteStyles;
  folderId: string;
}
