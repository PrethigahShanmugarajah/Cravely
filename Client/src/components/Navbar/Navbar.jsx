import { useEffect, useState } from "react";
import { FaConciergeBell, FaUtensils } from "react-icons/fa";
import {
  FiBook,
  FiHome,
  FiKey,
  FiLogOut,
  FiPackage,
  FiPhone,
  FiShoppingCart,
  FiStar,
} from "react-icons/fi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../CartContext/CartContext";
import Login from "../Login/Login";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  /* -------------------------------- Combine Updating Login Modal and Auth Status On Location Change -------------------------------- */
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("loginData")),
  );

  useEffect(() => {
    setShowLoginModal(location.pathname === "/login");
    setIsAuthenticated(Boolean(localStorage.getItem("loginData")));
  }, [location.pathname]);

  const handleLoginSuccess = () => {
    localStorage.setItem("loginData", JSON.stringify({ loggedIn: true }));
    setIsAuthenticated(true);
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setIsAuthenticated(false);
  };

  /* -------------------------------- Extract Desktop Auth Button -------------------------------- */
  const renderDesktopAuthButton = () => {
    return isAuthenticated ? (
      <button
        onClick={handleLogout}
        className="px-3 lg:px-4 py-1.5 lg:py-2 bg-linear-to-br from-teal-500 to-teal-700 text-[#0F172A] rounded-2xl font-bold hover:shadow-lg hover:shadow-teal-600/40 transition-all transform hover:scale-[1.02] border-2 border-teal-600/20 flex items-center space-x-2 shadow-md shadow-teal-900/20 text-sm cursor-pointer"
      >
        <FiLogOut className="text-base lg:text-lg" />
        <span className="text-shadow">Logout</span>
      </button>
    ) : (
      <button
        onClick={() => navigate("/login")}
        className="px-3 lg:px-4 py-1.5 lg:py-2 bg-linear-to-br from-teal-500 to-teal-700 text-[#0F172A] rounded-2xl font-bold hover:shadow-lg hover:shadow-teal-600/40 transition-all transform hover:scale-[1.02] border-2 border-teal-600/20 flex items-center space-x-2 shadow-md shadow-teal-900/20 text-sm cursor-pointer"
      >
        <FiKey className="text-base lg:text-lg" />
        <span className="text-shadow">Login</span>
      </button>
    );
  };

  /* -------------------------------- Extract Mobile Auth Button -------------------------------- */
  const renderMobileAuthButton = () => {
    return isAuthenticated ? (
      <button
        onClick={handleLogout}
        className="w-full px-4 py-3 bg-linear-to-br from-teal-500 to-teal-700 text-[#0F172A] rounded-xl font-semibold flex items-center justify-center space-x-2 text-sm cursor-pointer"
      >
        <FiLogOut />
        <span>Logout</span>
      </button>
    ) : (
      <button
        onClick={() => {
          navigate("/login");
          setIsOpen(false);
        }}
        className="w-full px-4 py-3 bg-linear-to-br from-teal-500 to-teal-700 text-[#0F172A] rounded-xl font-semibold flex items-center justify-center space-x-2 text-sm cursor-pointer"
      >
        <FiKey />
        <span>Login</span>
      </button>
    );
  };

  const navLinks = [
    { name: "Home", to: "/", icon: <FiHome /> },
    { name: "Menu", to: "/menu", icon: <FiBook /> },
    { name: "About", to: "/about", icon: <FiStar /> },
    { name: "Contact", to: "/contact", icon: <FiPhone /> },
    ...(isAuthenticated
      ? [{ name: "My Orders", to: "/myorder", icon: <FiPackage /> }]
      : []),
  ];

  return (
    <nav className="bg-[#0F172A] border-b-8 border-teal-900/40 shadow-[0_25px_50px_-12px] shadow-teal-900/30 sticky top-0 z-50 font-vibes">
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4">
        <div className="h-1.5 bg-linear-to-r from-transparent via-teal-600/50 to-transparent shadow-[0_0_20px] shadow-teal-500/30"></div>
        <div className="flex justify-between px-6">
          <FaUtensils
            className="text-teal-500/40 -mt-4 -ml-2 rotate-45"
            size={32}
          />
          <FaUtensils
            className="text-teal-500/40 -mt-4 -mr-2 -rotate-45"
            size={32}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* -- Logo Section -- */}
          <div className="shrink-0 flex items-center space-x-2 group">
            <FaConciergeBell className="text-2xl md:text-3xl lg:text-4xl text-teal-500 transition-all group-hover:rotate-12" />
            <div className="flex flex-col ml-1 md:ml-2">
              <NavLink
                to="/"
                className="text-lg md:text-xl lg:text-2xl xl:text-3xl bg-linear-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent font-monsieur tracking-wider whitespace-nowrap"
              >
                Cravely
              </NavLink>
              <div className="h-0.75 bg-linear-to-r from-teal-600/30 via-teal-400/50 to-teal-600/30 w-full mt-1" />
            </div>
          </div>

          {/* -- Desktop Navigation -- */}
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-4 flex-1 justify-end">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                className={({ isActive }) =>
                  `px-2 xl:px-4 py-2 flex items-center space-x-2 rounded-3xl border-2 transition-colors text-sm xl:text-base
                      ${isActive ? "bg-teal-900/20 border-teal-600/50" : "border-transparent hover:border-teal-600/50"}`
                }
              >
                <span className="text-teal-500">{link.icon}</span>
                <span className="text-teal-100">{link.name}</span>
              </NavLink>
            ))}
            <div className="flex items-center space-x-2 xl:space-x-4 ml-2 xl:ml-4">
              <NavLink
                to="/cart"
                className="p-2 relative text-teal-100 hover:text-teal-300 transition-colors"
              >
                <FiShoppingCart className="text-lg xl:text-xl" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-teal-600 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </NavLink>
              {renderDesktopAuthButton()}
            </div>
          </div>

          {/* -- Hamburger Menu Button -- */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-teal-500 hover:text-teal-300 p-2 rounded-xl border-2 border-teal-900/30 transition-colors cursor-pointer"
            >
              <div className="space-y-2">
                <span
                  className={`block w-6 h-0.5 bg-current transition-transform ${isOpen ? "rotate-45 translate-y-2" : ""}`}
                />
                <span
                  className={`block w-6 h-0.5 bg-current ${isOpen ? "opacity-0" : ""}`}
                />
                <span
                  className={`block w-6 h-0.5 bg-current transition-transform ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* -------- Mobile/Tablet Menu -------- */}
      {isOpen && (
        <div className="lg:hidden bg-[#0F172A] border-t-4 border-teal-900/40">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-4 py-3 rounded-xl ${
                    isActive
                      ? "bg-teal-600/30 text-teal-400"
                      : "text-teal-100 hover:bg-teal-600/20"
                  }`
                }
              >
                <span className="text-teal-500">{link.icon}</span>
                <span>{link.name}</span>
              </NavLink>
            ))}
            <div className="pt-4 border-t border-teal-900/40 space-y-3">
              <NavLink
                to="/cart"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center space-x-2 px-4 py-3 text-teal-100 hover:bg-teal-600/20 rounded-xl"
              >
                <FiShoppingCart />
                <span>Cart</span>
                {totalItems > 0 && (
                  <span className="bg-teal-600 text-xs px-2 py-1 rounded-full">
                    {totalItems}
                  </span>
                )}
              </NavLink>
              {renderMobileAuthButton()}
            </div>
          </div>
        </div>
      )}

      {/* -------- Login Modal -------- */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-linear-to-br from-[#0F172A] to-[#1E293B] rounded-xl p-8 w-full max-w-md relative border-4 border-teal-700/30">
            <button
              onClick={() => navigate("/")}
              className="absolute top-4 right-4 text-teal-500 hover:text-teal-300 text-2xl"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold bg-linear-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent mb-6 text-center">
              Cravely
            </h2>
            <Login
              onLoginSuccess={handleLoginSuccess}
              onClose={() => navigate("/")}
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
