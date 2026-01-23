// Cravely / Admin / src / api / api_route.js
const BASE_URL = import.meta.env.VITE_BASEURL;

const API_ROUTES = {
  ITEM: {
    ITEM_CREATE: `${BASE_URL}/api/items/item-create`,
  },
};
export default API_ROUTES;
