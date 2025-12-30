// Cravely / Client / src / CartContext / CartContext.jsx
import { createContext, useContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const value = {};

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
