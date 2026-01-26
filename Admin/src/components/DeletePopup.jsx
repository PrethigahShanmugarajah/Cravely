import { MdClose } from "react-icons/md";
import { ClipLoader } from "react-spinners";

const DeletePopup = ({ onClose, onDelete, loading }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-md w-96 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-zinc-700 cursor-pointer"
        >
          <MdClose size={20} />
        </button>

        <div className="text-center mt-4">
          <h4 className="mt-3 mb-2 text-lg font-semibold">Are you sure?</h4>
          <p className="text-zinc-500 text-sm">
            Do you really want to delete this record? <br />
            This action cannot be undone.
          </p>

          <div className="flex justify-center mt-4 gap-2">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-zinc-300 hover:bg-zinc-100 rounded-md transition-all cursor-pointer hover:rounded-full"
            >
              Cancel
            </button>

            <button
              className="px-6 py-2 bg-state-600 hover:bg-state-700 text-white rounded-md transition-all cursor-pointer hover:rounded-full"
              disabled={loading}
              onClick={onDelete}
            >
              {loading ? <ClipLoader size={20} color="#FFFFFF" /> : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
