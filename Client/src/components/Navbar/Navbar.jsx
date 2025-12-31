// Craverly / Client / src / components / Navbar / Navbar.jsx
import { useEffect, useState } from "react";
import { FaConciergeBell, FaUtensils } from "react-icons/fa";
import {
  FiBook,
  FiHome,
  FiKey,
  FiLogOut,
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

  /* -------- Combine Updating Login Modal and Auth Status On Location Change -------- */
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(localStorage.getItem("loginData"))
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

  /* ---- Extract Desktop Auth Button ---- */
  const renderDesktopAuthButton = () => {
    return isAuthenticated ? (
      <button
        onClick={handleLogout}
        className="px-3 md:px-3 lg:px-6 py-1.5 md:py-2 lg:py-3 bg-linear-to-br from-teal-500 to-teal-700 text-[#0F172A] rounded-2xl font-bold hover:shadow-lg hover:shadow-teal-600/40 transition-all transform hover:scale-[1.02] border-2 border-teal-600/20 flex items-center space-x-2 shadow-md shadow-teal-900/20 text-xs md:text-sm lg:text-sm cursor-pointer"
      >
        <FiLogOut className="text-base md:text-lg lg:text-lg" />
        <span className="text-shadow">Logout</span>
      </button>
    ) : (
      <button
        onClick={() => navigate("/login")}
        className="px-3 md:px-3 lg:px-6 py-1.5 md:py-2 lg:py-3 bg-linear-to-br from-teal-500 to-teal-700 text-[#0F172A] rounded-2xl font-bold hover:shadow-lg hover:shadow-teal-600/40 transition-all transform hover:scale-[1.02] border-2 border-teal-600/20 flex items-center space-x-2 shadow-md shadow-teal-900/20 text-xs md:text-sm lg:text-sm cursor-pointer"
      >
        <FiKey className="text-base md:text-lg lg:text-lg" />
        <span className="text-shadow">Login</span>
      </button>
    );
  };

  /* ---- Extract Mobile Auth Button ---- */
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
  ];

  return (
    <nav className="bg-[#0F172A] border border-b-8 border-teal-900/30 shadow-teal-900/30 sticky top-0 z-50 shadow-[0_25px_50px_-12px] group/nav overflow-x-hidden hide-scrollbar">
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4">
        <div className="h-1.5 bg-linear-to-r from-transparent via-teal-600/50 to-transparent shadow-[0_0_20px] shadow-teal-500/30">
          <FaUtensils
            className="text-teal-500/40 -mt-4 -ml-2 rotate-45"
            size={32}
          />
          <FaUtensils
            className="text-teal-500/40 -mt-4 -ml-2 -rotate-45"
            size={32}
          />
        </div>
      </div>

      {/* -- Main Navigation Containter -- */}
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="flex justify-between items-center h-16 md:h-20 lg:h-24">
          {/* Logo Section */}
          <div className="shrink-0 flex items-center space-x-2 group relative md:-translate-x-4 lg:translate-x-6 ml-0 md:ml-2">
            <div className="absolute -inset-4 bg-teal-500/10 rounded-full blur-xl opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300" />
            <FaConciergeBell className="text-3xl md:text-4xl lg:text-5xl text-teal-500 transition-all group-hover:rotate-12 group-hover:text-teal-400 hover:drop-shadow-[0_0_15px] hover:drop-shadow-500/50" />
            <div className="flex flex-col relative ml-2 max-w-35 md:max-w-40 lg:max-w-none">
              <NavLink
                to="/"
                className="text-2xl md:text-xl lg:text-4xl bg-linear-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent font-monsieur tracking-wider drop-shadow-[0_2px_2px] drop-shadow-black -translate-x-2 truncate md:truncate-none"
              >
                Cravely
              </NavLink>
              <div className="h-0.75 bg-linear-to-r from-teal-600/30 via-teal-400/50 to-teal-600/30 w-full mt-1 ml-1 shadow-[0_2px_5px] shadow-teal-500/20" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 md:space-x-1 lg:space-x-4 flex-1 justify-end">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                className={({ isActive }) =>
                  `group px-3 md:px-3 lg:px-4 py-2 md:py-2 lg:py-3 text-sm md:text-[15px] lg:text-base relative transition-all duration-300 flex items-center hover:bg-teal-900/20 rounded-3xl border-2 ${
                    isActive
                      ? "border-teal-600/50 bg-teal-900/20 shadow-[inset_0_0_15px] shadow-teal-500/20"
                      : "border-teal-900/30 hover:border-teal-600/50"
                  } shadow-md shadow-teal-900/20`
                }
              >
                <span className="mr-2 text-sm md:text-[15px] lg:text-base text-teal-500 group-hover:text-teal-300 transition-all">
                  {link.icon}
                </span>

                <span className="text-teal-100 group-hover:text-teal-300 relative">
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all group-hover:w-full" />
                </span>
              </NavLink>
            ))}

            <div className="flex items-center space-x-2 md:space-x-3 lg:space-x-4 ml-3 md:ml-3 mr-2 md:mr-3 lg:mr-4">
              <NavLink
                to="/cart"
                className="p-2 md:p-2.0 lg:p-3 text-teal-100 rounded-xl transition-all relative border-2 border-teal-900/30 hover:border-teal-600/50 group hover:bg-teal-900/20 hover:shadow-lg hover:shadow-teal-500/30 shadow-md shadow-teal-900/20"
              >
                <FiShoppingCart className="text-base md:text-lg lg:text-lg " />
                {totalItems > 0 && (
                  <div className="absolute -top-2 -right-2 bg-teal-600 text-teal-100 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </div>
                )}
              </NavLink>
              {renderDesktopAuthButton()}
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center mr-2">
            <button
              className="text-teal-500 hover:text-teal-300 focus:outline-none transition-all p-2 rounded-xl border-2 border-teal-900/30 hover:border-teal-600/50 relative shadow-md shadow-teal-900/20 hover:shadow-lg hover:shadow-teal-500/30 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="space-y-2 relative">
                <span
                  className={`block w-6 h-0.5 bg-current transition-all ${
                    isOpen ? "rotate-45 translate-y-1.75" : ""
                  }`}
                />

                <span
                  className={`block w-6 h-0.5 bg-current ${
                    isOpen ? "opacity-0" : ""
                  }`}
                />

                <span
                  className={`block w-6 h-0.5 bg-current transition-all ${
                    isOpen ? "-rotate-45 -translate-y-1.75" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* -- Mobile Navigation -- */}
      {isOpen && (
        <div className="md:hidden bg-[#0F172A] border-t-4 border-teal-900/40 relative shadow-lg shadow-teal-900/30 w-full">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 text-sm rounded-xl transition-all items-center ${
                    isActive
                      ? "bg-teal-600/30 text-teal-400"
                      : "text-teal-100 hover:bg-teal-600/20"
                  } border-2 ${
                    isActive ? "border-teal-600/50" : "border-teal-900/30"
                  }`
                }
              >
                <span className="mr-3 text-teal-500">{link.icon}</span>
                {link.name}
              </NavLink>
            ))}

            <div className="pt-4 border-t-2 border-teal-900/30 space-y-2">
              <NavLink
                to="/cart"
                className="w-full px-4 py-3 text-center text-teal-100 rounded-xl border-2 border-teal-900/30 hover:border-teal-600/50 flex items-center justify-center space-x-2 text-sm"
                onClick={() => setIsOpen(false)}
              >
                <FiShoppingCart className="text-lg" />
                {totalItems > 0 && (
                  <span className="top-2 right-2 bg-teal-600 text-teal-100 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </NavLink>
              {renderMobileAuthButton()}
            </div>
          </div>
        </div>
      )}

      {/* -- Login Model -- */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-linear-to-br from-[#0F172A] to-[#1E293B] rounded-xl p-6 w-full max-w-120 relative border-teal-700/30 shadow-[0_0_30px] shadow-teal-500/30">
            <button
              onClick={() => navigate("/")}
              className="absolute top-2 right-2 text-teal-500 hover:text-teal-300 text-2xl cursor-pointer"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold bg-linear-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent mb-4 text-center">
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
