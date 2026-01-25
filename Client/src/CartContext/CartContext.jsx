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
    const token = localStorage.getItem("authToken");

    api
      .get(API_ROUTES.CART.CART_GET, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      })
      // .then((res) => dispatch({ type: "HYDRATE_CART", payload: res.data }))
      .then((res) => {
        const cartArray = Array.isArray(res.data.cartItems)
          ? res.data.cartItems
          : [];
        dispatch({ type: "HYDRATE_CART", payload: cartArray });
      })
      .catch((error) => {
        if (error.response?.status !== 401) console.error(error);
        dispatch({ type: "HYDRATE_CART", payload: [] }); // fallback
      });
  }, []);

  /* ---- Dispatcher Wrapped With useCallback for Performance ---- */
  const addToCart = useCallback(async (item, qty) => {
    const token = localStorage.getItem("authToken");

    const res = await api.post(
      API_ROUTES.CART.CART_ADD,
      { itemId: item._id, quantity: qty },
      { withCredentials: true, headers: { Authorization: `Bearer ${token}` } },
    );

    // dispatch({ type: "ADD_ITEM", payload: res.data });
    dispatch({ type: "ADD_ITEM", payload: res.data.item });
  }, []);

  const removeFromCart = useCallback(async (_id) => {
    const token = localStorage.getItem("authToken");

    await api.delete(API_ROUTES.CART.CART_DELETE_ITEM(_id), {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({ type: "REMOVE_ITEM", payload: _id });
  }, []);

  const updateQuantity = useCallback(async (_id, qty) => {
    const token = localStorage.getItem("authToken");

    await api.put(
      API_ROUTES.CART.CART_UPDATE_ITEM(_id),
      { quantity: qty },
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    // dispatch({ type: "UPDATE_ITEM", payload: res.data });
    dispatch({ type: "UPDATE_ITEM", payload: res.data.item });
  }, []);

  const clearCart = useCallback(async () => {
    const token = localStorage.getItem("authToken");

    await api.delete(
      API_ROUTES.CART.CART_CLEAR,
      {},
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const totalItems = cartItems.reduce((sum, ci) => sum + ci.quantity, 0);
  const totalAmount = cartItems.reduce((sum, ci) => {
    const price = ci?.price ?? 0;
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
