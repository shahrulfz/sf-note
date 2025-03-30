import SidebarFolder from "@/components/sidebar/SidebarFolder";
import useFolderStore from "@/stores/folders/useFolderStore";
import SFNoteEditorParent from "@/components/SFNoteEditorParent";
import NotesSection from "@/components/section/NotesSection";
import SelectedModal from "@/templates/modal/SelectedModal";
import useSelectedModalStore from "@/stores/modal/useSelectedModalStore";
import useNoteStore from "@/stores/notes/useNewNoteStore";
import useNoteListStore from "@/stores/notes/useNoteListStore";
import { useState } from "react";

export default function index() {
  const {
    folders,
    selectedFolder,
    setSelectedFolder,
    addFolder,
    removeFolder,
  } = useFolderStore();

  const { isOpen, openSelectedModal, closeSelectedModal } =
    useSelectedModalStore();

  const [isClick, setIsClick] = useState(false);
  const {
    title,
    note,
    noteStyles,
    folderId,
    setTitle,
    setNote,
    setNoteStyles,
    setFolderId,
    reset,
  } = useNoteStore();
  const { addNote } = useNoteListStore();

  const handleSave = () => {
    addNote({ title, note, noteStyles, folderId });
    setIsClick(false);
    reset();
  };

  return (
    <div>
      <SelectedModal isOpen={isOpen} onClose={closeSelectedModal} />

      <p className="pl-8 pt-8 text-lg font-bold">SF Note by Shahrul</p>
      <div className="grid grid-cols-12 mt-12">
        <SidebarFolder
          folders={folders}
          selectedFolder={selectedFolder}
          setSelectedFolder={setSelectedFolder}
          addFolder={addFolder}
          removeFolder={removeFolder}
        />

        <div className="col-span-10">
          <SFNoteEditorParent
            className="w-1/2"
            folders={folders}
            title={title}
            note={note}
            noteStyles={noteStyles}
            folderId={folderId}
            setTitle={setTitle}
            setNote={setNote}
            setNoteStyles={setNoteStyles}
            setFolderId={setFolderId}
            reset={reset}
            handleSave={handleSave}
            isClick={isClick}
            setIsClick={setIsClick}
          />
          <NotesSection openSelectedModal={openSelectedModal} />
        </div>
      </div>
    </div>
  );
}
