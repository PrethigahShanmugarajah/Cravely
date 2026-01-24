// Cravely / Admin / src / components / List / List.jsx
import { useEffect, useState } from "react";
import { FiHeart, FiStar, FiTrash2 } from "react-icons/fi";
import api from "../../api/axios";
import API_ROUTES from "../../api/api_route";
import { toast } from "react-toastify";
import DeletePopup from "../DeletePopup";

const List = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data } = await api.get(API_ROUTES.ITEM.ITEM_GET_ALL);

        console.log("Fetch Item API Response:", data);

        if (data.success) {
          console.log("Fetch Item Success:", data.message);

          setItems(data.items);
        } else {
          toast.warn(data.message);
          console.log("Fetch Item Data Error:", data.message);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || error?.message);
        console.log("Fetch Item Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (itemId) => {
    // if (!deleteItemId) return;
    if (!itemId) return;

    try {
      setDeleting(true);
      const { data } = await api.delete(API_ROUTES.ITEM.ITEM_DELETE(itemId));

      console.log("Fetch Item API Response:", data);

      if (data.success) {
        toast.success(data.message);
        console.log("Delete Item Success:", data.message);

        setItems((prev) => prev.filter((item) => item._id !== itemId));
        console.log("Delete Item ID:", itemId);
        setDeleteItemId(null);
      } else {
        toast.warn(data.message);
        console.log("Delete Item Data Error:", data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
      console.log("Delete Item Error:", error);
    } finally {
      setDeleting(false);
    }
  };

  const renderStarts = (rating) =>
    [...Array(5)].map((_, i) => (
      <FiStar
        className={`text-xl ${i < rating ? "text-teal-400 fill-current" : "text-teal-100/30"}`}
        key={i}
      />
    ));

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#1a120b] via-[#2a1e14] to-[#3e2b1d] py-12 px-4 sm:px-6 lg:px-8">
        Loading Menu...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#111827] via-[#1F2937] to-[#293548] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#3F3F46]/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border-2 border-teal-500/20">
          <h2 className="text-3xl font-bold mb-8 bg-linear-to-r from-teal-300 to-teal-500 bg-clip-text text-transparent text-center">
            Mange Menu Item
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#2C2F3F]/50">
                <tr>
                  <th className="p-4 text-left text-teal-400">Image</th>
                  <th className="p-4 text-left text-teal-400">Name</th>
                  <th className="p-4 text-left text-teal-400">Category</th>
                  <th className="p-4 text-left text-teal-400">Price</th>
                  <th className="p-4 text-left text-teal-400">Rating</th>
                  <th className="p-4 text-left text-teal-400">Hearts</th>
                  <th className="p-4 text-left text-teal-400">Action</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-teal-500/20 hover:bg-[#2C2F3F]/30 transition-colors"
                  >
                    <td className="p-4">
                      <div className="w-24 h-24 overflow-hidden rounded-lg">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="space-y-1">
                        <p className="text-teal-100 font-medium text-lg">
                          {item.name}
                        </p>

                        <p className="text-sm text-teal-100/60">
                          {item.description}
                        </p>
                      </div>
                    </td>

                    <td className="p-4 text-teal-100/80">{item.category}</td>

                    <td className="p-4 text-teal-300 font-medium">
                      $ {item.price}
                    </td>

                    <td className="p-4">
                      <div className="flex gap-1">
                        {renderStarts(item.rating)}
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-2 text-teal-400">
                        <FiHeart className="text-xl" />
                        <span>{item.hearts}</span>
                      </div>
                    </td>

                    <td className="p-4 text-center">
                      <button
                        // onClick={() => handleDelete(item._id)}
                        onClick={() => setDeleteItemId(item._id)}
                        className="text-teal-500 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-900/20 cursor-pointer"
                      >
                        <FiTrash2 className="text-2xl" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {items.length === 0 && (
            <div className="text-center py-12 text-teal-100/60 text-xl">
              No items found in the menu
            </div>
          )}
        </div>
      </div>

      {deleteItemId && (
        <DeletePopup
          onClose={() => setDeleteItemId(null)}
          onDelete={() => handleDelete(deleteItemId)}
          loading={deleting}
        />
      )}
    </div>
  );
};

export default List;
