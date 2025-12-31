// Cravely / Client / src / CartContext / CartContext.jsx
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const CartContext = createContext();

/* -------- Reduce Handling Cart Actions Like Add, Remove, Update Quanitity And Item. -------- */
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const { item, quantity } = action.payload;
      const existingItem = state.find((i) => i.id === item.id);
      if (existingItem) {
        return state.map((i) => (i.id === item.id ? { ...i, quantity } : i));
      }
      return [...state, { ...item, quantity }];
    }
    case "REMOVE_ITEM": {
      return state.filter((i) => i.id !== action.payload.itemId);
    }
    case "UPDATE_QUANTITY": {
      const { itemId, newQuantity } = action.payload;
      return state.map((i) =>
        i.id === itemId ? { ...i, quantity: Math.max(1, newQuantity) } : i
      );
    }
    default:
      return state;
  }
};

/* -------- Initatlize Cart From Local Storage -------- */
const initializer = () => {
  if (typeof window !== "undefined") {
    const localCart = localStorage.getItem("cart");
    return localCart ? JSON.parse(localCart) : [];
  }
  return [];
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, [], initializer);
  /* ---- Initatlize Cart From Local Storage ---- */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  /* ---- Calculate Total Cost & Total Item Count ---- */
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItemsCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  /* ---- Format Total Items in Power Form ---- */
  const formatTotalItems = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num;
  };

  /* ---- Dispatcher Wrapped With useCallback for Performance ---- */
  const addToCart = useCallback((item, quantity) => {
    dispatch({ type: "ADD_ITEM", payload: { item, quantity } });
  }, []);

  const removeFromCart = useCallback((itemId) => {
    dispatch({ type: "REMOVE_ITEM", payload: { itemId } });
  }, []);

  const updateQuantity = useCallback((itemId, newQuantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { itemId, newQuantity } });
  }, []);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartTotal,
    totalItems: formatTotalItems(totalItemsCount),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
