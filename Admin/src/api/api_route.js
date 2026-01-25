// Cravely / Admin / src / api / api_route.js
const BASE_URL = import.meta.env.VITE_BASEURL;

const API_ROUTES = {
  ITEM: {
    ITEM_CREATE: `${BASE_URL}/api/items/item-create`,
    ITEM_GET_ALL: `${BASE_URL}/api/items/item-get-all`,
    ITEM_DELETE: (itemId) => `${BASE_URL}/api/items/item-delete/${itemId}`,
  },

  ORDER: {
    ORDER_ADMIN_GET_ALL: `${BASE_URL}/api/order/order-admin-get-all`,
    ORDER_UPDATE_ADMIN_GET_ALL: (orderId) =>
      `${BASE_URL}/api/order/order-update-any-by-admin/${orderId}`,
  },
};
export default API_ROUTES;
