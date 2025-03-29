import useUpdateNoteStore from "@/stores/notes/useUpdateNoteStore";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

const SelectedModal: React.FC<ModalProps> = ({ isOpen, onClose, title }) => {
  if (!isOpen) return null;
  const { selectedNoteId } = useUpdateNoteStore();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-300/70">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full hover:cursor-pointer transition duration-200"
          aria-label="Close"
        >
          <span className="text-2xl font-bold text-gray-500 hover:text-red-600">
            &times;
          </span>
        </button>

        {/* Modal Title */}
        <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>

        {/* Modal Content */}
        <p className="text-gray-600">{selectedNoteId}</p>
      </div>
    </div>
  );
};

export default SelectedModal;
