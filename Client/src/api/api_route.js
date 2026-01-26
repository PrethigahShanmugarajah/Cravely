// Cravely / Client / src / api / api_route.js
const BASE_URL = import.meta.env.VITE_BASEURL;

const API_ROUTES = {
  CART: {
    CART_GET: `${BASE_URL}/api/cart/cart-get`,
    CART_ADD: `${BASE_URL}/api/cart/cart-add`,
    CART_DELETE_ITEM: (id) => `${BASE_URL}/api/cart/cart-delete-item/${id}`,
    CART_UPDATE_ITEM: (id) => `${BASE_URL}/api/cart/cart-update-item/${id}`,
    CART_CLEAR: `${BASE_URL}/api/cart/cart-clear`,
  },

  USER: {
    USER_REGISTER: `${BASE_URL}/api/user/user-register`,
    USER_LOGIN: `${BASE_URL}/api/user/user-login`,
  },

  ITEM: {
    ITEM_GET_ALL: `${BASE_URL}/api/items/item-get-all`,
  },

  ORDER: {
    ORDER_CONFIRM_PAYMENT: `${BASE_URL}/api/order/order-confirm-payment`,
    ORDER_CREATE: `${BASE_URL}/api/order/order-create`,
  },
};
export default API_ROUTES;
