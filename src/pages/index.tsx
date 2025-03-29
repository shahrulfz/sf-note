import SidebarFolder from "@/components/sidebar/SidebarFolder";
import useFolderStore from "@/stores/folders/useFolderStore";
import NoteTaker from "@/components/SFNoteEditorParent";
import useNoteListStore from "@/stores/notes/useNoteListStore";
import NotesSection from "@/components/section/NotesSection";

export default function index() {
  const {
    folders,
    selectedFolder,
    setSelectedFolder,
    addFolder,
    removeFolder,
  } = useFolderStore();

  const { notesList } = useNoteListStore();

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

        <div className="col-span-10">
          <NoteTaker folders={folders} />
          <NotesSection notesList={notesList} />
        </div>
      </div>
    </div>
  );
}
