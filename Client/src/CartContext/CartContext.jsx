// Cravely / Client / src / CartContext / CartContext.jsx
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import api from "../../../Admin/src/api/axios";
import API_ROUTES from "../api/api_route";
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from "../utils/toast";

const CartContext = createContext();

/* -------- Reduce Handling Cart Actions Like Add, Remove, Update Quanitity And Item. -------- */
const cartReducer = (state, action) => {
  switch (action.type) {
    case "HYDRATE_CART":
      return action.payload;

    case "ADD_ITEM": {
      const { _id, item, quantity } = action.payload;
      const exists = state.find((ci) => ci._id === _id);
      if (exists) {
        return state.map((ci) =>
          ci.id === _id ? { ...ci, quantity: ci.quantity + quantity } : ci,
        );
      }
      return [...state, { _id, item, quantity }];
    }

    case "REMOVE_ITEM": {
      return state.filter((ci) => ci._id !== action.payload);
    }

    case "UPDATE_ITEM": {
      const { _id, quantity } = action.payload;
      return state.map((ci) => (ci._id === _id ? { ...ci, quantity } : ci));
    }

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};

/* -------- Initatlize Cart From Local Storage -------- */
const initializer = () => {
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  } catch (error) {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, [], initializer);
  /* ---- Initatlize Cart From Local Storage ---- */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  /* ---- Initatlize Cart From Local Storage ---- */
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("authToken");

      try {
        const { data } = await api.get(API_ROUTES.CART.CART_GET, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetch Cart API Response:", data);

        if (data.success && (Array.isArray(data.cartItems) || data.cartItems)) {
          // showSuccessToast(data.message);
          console.log("Fetch Cart Success:", data.message);

          const cartArray = Array.isArray(data.cartItems) ? data.cartItems : [];
          dispatch({ type: "HYDRATE_CART", payload: cartArray });
        } else {
          showWarningToast(data.message);
          console.log("Fetch Cart Data Error:", data.message);
        }
      } catch (error) {
        showErrorToast(error?.response?.data?.message || error?.message);
        console.error("Fetch Cart Error:", error);
      }
    };

    fetchCart();
  }, []);

  /* ---- Dispatcher Wrapped With useCallback for Performance ---- */
  const addToCart = useCallback(async (item, qty) => {
    const token = localStorage.getItem("authToken");

    try {
      const { data } = await api.post(
        API_ROUTES.CART.CART_ADD,
        { itemId: item._id, quantity: qty },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      console.log("Add to Cart API Response:", data);

      if (data.success && data.item) {
        showSuccessToast(data.message);
        console.log("Add to Cart Success:", data.message);

        dispatch({ type: "ADD_ITEM", payload: data.item });
      } else {
        showWarningToast(data.message);
        console.log("Add to Cart Data Error:", data.message);
      }
    } catch (error) {
      showErrorToast(error?.response?.data?.message || error?.message);
      console.error("Add to Cart Error:", error);
    }
  }, []);

  const removeFromCart = useCallback(async (_id) => {
    const token = localStorage.getItem("authToken");

    try {
      const { data } = await api.delete(API_ROUTES.CART.CART_DELETE_ITEM(_id), {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Remove Cart Item API Response:", data);

      if (data?.success) {
        dispatch({ type: "REMOVE_ITEM", payload: _id });
        showSuccessToast(data.message);
        console.log("Remove Cart Item Success:", data.message);
      } else {
        showWarningToast(data?.message);
        console.log("Remove Cart Item Data Error:", data?.message);
      }
    } catch (error) {
      showErrorToast(error?.response?.data?.message);
      console.error("Remove Cart Item Error:", error);
    }
  }, []);

  const updateQuantity = useCallback(async (_id, qty) => {
    const token = localStorage.getItem("authToken");

    try {
      const { data } = await api.put(
        API_ROUTES.CART.CART_UPDATE_ITEM(_id),
        { quantity: qty },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      console.log("Update Quantity API Response:", data);

      if (data.success && data.item) {
        // showSuccessToast(data.message);
        console.log("Update Quantity Success:", data.message);

        dispatch({ type: "UPDATE_ITEM", payload: data.item });
      } else {
        showWarningToast(data.message);
        console.log("Update Quantity Data Error:", data.message);
      }
    } catch (error) {
      showErrorToast(error?.response?.data?.message || error?.message);
      console.error("Update Quantity Error:", error);
    }
  }, []);

  const clearCart = useCallback(async () => {
    const token = localStorage.getItem("authToken");

    try {
      const { data } = await api.delete(API_ROUTES.CART.CART_CLEAR, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      console.log("Clear Cart API Response:", data);

      if (data.success) {
        console.log("Clear Cart Success:", data.message);
        showSuccessToast(data.message);

        dispatch({ type: "CLEAR_CART" });
      } else {
        console.log("Clear Cart Data Error:", data.message);
        showWarningToast(data.message);
      }
    } catch (error) {
      console.log(
        "Clear Cart Error:",
        error?.response?.data?.message || error?.message,
      );
      showErrorToast(error?.response?.data?.message || error?.message);
    }
  }, []);

  const totalItems = cartItems.reduce((sum, ci) => sum + ci.quantity, 0);

  const totalAmount = cartItems.reduce((sum, ci) => {
    const price = Number(ci?.item?.price ?? 0);
    const qty = ci?.quantity ?? 0;
    return sum + price * qty;
  }, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalAmount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
