import SidebarFolder from "@/components/sidebar/SidebarFolder";
import useFolderStore from "@/stores/folders/useFolderStore";
import NoteTaker from "@/components/SFNoteEditorParent";
import NotesSection from "@/components/section/NotesSection";
import SelectedModal from "@/components/modal/SelectedModal";
import useSelectedModalStore from "@/stores/modal/useSelectedModalStore";

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

  return (
    <div>
      <SelectedModal
        isOpen={isOpen}
        onClose={closeSelectedModal}
        title="Update Note"
      />

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
          <NotesSection openSelectedModal={openSelectedModal} />
        </div>
      </div>
    </div>
  );
}
