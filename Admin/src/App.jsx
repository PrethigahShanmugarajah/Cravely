// Craverly /  Admin / src / App.jsx
import AddItems from "./components/AddItems/AddItems";
import List from "./components/List/List";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Order from "./components/Order/Order";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<AddItems />} />
        <Route path="/list" element={<List />} />
        <Route path="/orders" element={<Order />} />
      </Routes>
    </div>
  );
};

export default App;
