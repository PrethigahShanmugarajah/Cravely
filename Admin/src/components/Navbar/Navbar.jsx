// Cravely / Admin / src / components / Navbar / Navbar.jsx
import { useState } from "react";
import { FiList, FiMenu, FiPackage, FiPlusCircle, FiX } from "react-icons/fi";
import { FaConciergeBell } from "react-icons/fa";

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
            <a
              key={link.name}
              href={link.href}
              className="flex items-center space-x-1 text-teal-200 hover:text-teal-400"
            >
              {link.icon}
              <span>{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
