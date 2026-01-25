// Craverly / Client / src / components / OurMenu / OurMenu.jsx
import { useState } from "react";
import { useCart } from "../../CartContext/CartContext";
import { FaMinus, FaPlus } from "react-icons/fa";
import "./OurMenu.css";
import api from "../../api/axios";
import API_ROUTES from "../../api/api_route";
import { useEffect } from "react";
import { showErrorToast, showWarningToast } from "../../utils/toast";

const categories = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Maxicon",
  "Desserts",
  "Drinks",
];

const OurMenu = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [menuData, setMenuData] = useState({});
  const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const { data } = await api.get(API_ROUTES.ITEM.ITEM_GET_ALL);

        console.log("Fetch Menu API Response:", data);

        if (data?.success && Array.isArray(data.items)) {
          const byCategory = {};

          data.items.forEach((item) => {
            const cat = item.category || "Uncategorized";

            if (!byCategory[cat]) {
              byCategory[cat] = [];
            }

            byCategory[cat].push(item);
          });

          setMenuData(byCategory);
          // showSuccessToast(data.message);
          console.log("Fetch Menu Success:", data.message);
        } else {
          showWarningToast(data?.message);
          console.log("Fetch Menu Data Error:", data.message);

          setMenuData({});
        }
      } catch (error) {
        showErrorToast(error?.response?.data?.message);
        console.error("Fetch Menu Error:", error);
      }
    };

    fetchMenu();
  }, []);

  // useEffect(() => {
  //   const fetchMenu = async () => {
  //     try {
  //       const { data } = await api.get(API_ROUTES.ITEM.ITEM_GET_ALL);

  //       const byCategory = Array.isArray(data.items)
  //         ? data.items.reduce((acc, item) => {
  //             const cat = item.category || "Uncategorized";
  //             acc[cat] = acc[cat] || [];
  //             acc[cat].push(item);
  //             return acc;
  //           }, {})
  //         : {};

  //       setMenuData(byCategory);
  //     } catch (error) {
  //       console.error("Fetch Menu Error:", error);
  //     }
  //   };

  //   fetchMenu();
  // }, []);

  const getCartEntry = (id) => cartItems.find((ci) => ci.item._id === id);
  const getQuantity = (id) => getCartEntry(id)?.quantity || 0;

  const displayItems = (menuData[activeCategory] ?? []).slice(0, 12);

  return (
    <div className="bg-linear-to-br from-[#111827] via-[#1F2937] to-[#293548] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center mb-12 bg-clip-text text-transparent bg-linear-to-r from-teal-200 via-teal-300 to-teal-200">
          <span className="font-dancingscript block text-5xl md:text-7xl sm:text-6xl mb-2">
            Our Exquisite Menu
          </span>

          <span className="block text-xl sm:text-2xl md:text-3xl font-cinzel mt-4 text-teal-100/80">
            A Symphony of Falvours
          </span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-6 py-2 rounded-full border-2 transition-all duration-300 transform font-cinzel text-sm sm:text-lg tracking-widest backdrop-blur-sm cursor-pointer ${
                activeCategory === cat
                  ? "bg-linear-to-r from-teal-900/80 to-teal-700/80 border-teal-800 scale-105 shadow-xl shadow-teal-900/30"
                  : "bg-teal-900/20 border-teal-800/30 text-teal-100/80 hover:bg-teal-800/40 hover:scale-95"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {displayItems.map((item, i) => {
            const cartEntry = getCartEntry(item._id);

            const quantity = cartEntry?.quantity || 0;
            return (
              <div
                key={item._id}
                className="relative bg-teal-900/20 rounded-2xl overflow-hidden border border-teal-800/30 backdrop-blur-sm flex flex-col transition-all duration-300"
                style={{ "--index": i }}
              >
                <div className="relative h-48 sm:h-56 md:h-60 flex items-center justify-center bg-black/10">
                  <img
                    src={item.imageUrl || item.image}
                    alt={item.name}
                    className="max-h-full object-contain transition-all duration-700 cursor-pointer"
                  />
                </div>

                <div className="p-4 sm:p-6 flex flex-col grow">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-linear-to-r from-transparent via-teal-800/50 to-transparent opacity-50 transition-all duration-300 " />
                  <h3 className="text-xl sm:text-2xl mb-2 font-dancingscript text-teal-100">
                    {item.name}
                  </h3>

                  <p className="text-teal-100/80 text-xs sm:text-sm mb-4 font-cinzel leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-auto flex items-center gap-4 justify-between">
                    <div className="bg-teal-100/10 backdrop-blur-sm px-3 py-1 rounded-2xl shadow-lg">
                      <span className="text-xl font-bold text-teal-300 font-dancingscript">
                        ${Number(item.price).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {quantity > 0 ? (
                        <>
                          <button
                            className="w-8 h-8 rounded-full bg-teal-900/40 flex items-center justify-center hover:bg-teal-800/50 transition-colors cursor-pointer"
                            onClick={() =>
                              quantity > 1
                                ? updateQuantity(cartEntry._id, quantity - 1)
                                : removeFromCart(cartEntry._id)
                            }
                          >
                            <FaMinus className="text-teal-100" />
                          </button>

                          <span className="w-8 text-center text-teal-100">
                            {quantity}
                          </span>

                          <button
                            className="w-8 h-8 rounded-full bg-teal-900/40 flex items-center justify-center hover:bg-teal-800/50 transition-colors cursor-pointer"
                            onClick={() =>
                              updateQuantity(cartEntry._id, quantity + 1)
                            }
                          >
                            <FaPlus className="text-teal-100" />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => addToCart(item, 1)}
                          className="bg-teal-900/40 px-4 py-1.5 rounded-full font-cinzel text-xs uppercase sm:text-sm tracking-wider transition-transform duration-300 hover:scale-110 hover:shadow-lg hover:shadow-teal-900/20 relative overflow-hidden border border-teal-800/50 cursor-pointer"
                        >
                          <span className="relative z-10 text-xs text-black">
                            Add to Cart
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* <div className="flex justify-center mt-16">
          <Link
            to="/menu"
            className="bg-teal-900/30 border-2 border-teal-800/30 text-teal-100 px-8 sm:px-10 py-3 rounded-full font-cinzel uppercase tracking-widest transition-all duration-300 hover:bg-teal-800/40 hover:text-teal-50 hover:scale-105 hover:shadow-lg hover:shadow-teal-900/20 backdrop-blur-sm"
          >
            Explore Full Menu
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default OurMenu;
