// Cravely / Admin / src / components / Navbar / Navbar.jsx
import { useState } from "react";
import { FiList, FiMenu, FiPackage, FiPlusCircle, FiX } from "react-icons/fi";
import { FaConciergeBell } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Add Items", href: "/", icon: <FiPlusCircle /> },
    { name: "List Items", href: "/list", icon: <FiList /> },
    { name: "Orders", href: "/orders", icon: <FiPackage /> },
  ];

  return (
    <nav className="bg-[#0F172A] border-b-8 border-teal-900/40 shadow-lg sticky top-0 z-50 font-vibes">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-20">
        <div className="flex items-center space-x-3">
          <FaConciergeBell className="text-4xl text-teal-500" />
          <span className="text-2xl font-bold text-teal-100 tracking-wide">
            Admin Panel
          </span>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-teal-200 text-2xl lg:hidden cursor-pointer"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <div className="hidden lg:flex items-center space-x-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ${isActive ? "bg-teal-900/30 border-teal-500 text-teal-300" : "border-teal-900/30 text-teal-100 hover:border-teal-500 hover:bg-teal-900/20"}`
              }
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden flex flex-col space-y-3 mt-4 pb-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center space-x-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all ml-2 mr-2 ${isActive ? "bg-teal-900/30 border-teal-500 text-teal-300" : "border-teal-900/30 text-teal-100 hover:border-teal-500 hover:bg-teal-900/20"}`
              }
            >
              {link.icon}
              <span>{link.name}</span>
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
