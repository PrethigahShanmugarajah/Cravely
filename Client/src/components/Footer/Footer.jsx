import { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaRegEnvelope,
  FaYoutube,
} from "react-icons/fa";
import { BiChevronRight } from "react-icons/bi";
import { FaXTwitter } from "react-icons/fa6";

export const socialIcons = [
  {
    icon: FaFacebook,
    link: "https://www.facebook.com/share/1DjbwhdR4z/",
    color: "#3B5998",
    label: "Facebook",
  },
  {
    icon: FaInstagram,
    link: "https://www.instagram.com/hexagondigitalservices?igsh=MW1nanQ2eXIycnRkZQ==",
    color: "#E1306C",
    label: "Instagram",
  },
  {
    icon: FaXTwitter,
    link: "https://x.com/HexagonDService?t=Vv5ReZAIbXONqkq_O0ksWQ&s=09",
    color: "#000000",
    label: "X",
  },
  {
    icon: FaYoutube,
    link: "https://youtube.com/@hexagondigitalservices?si=UnBt0AHI-ChN5Mze",
    color: "#FF0000",
    label: "Youtube",
  },
];

const Footer = () => {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Menu", link: "/menu" },
    { name: "About Us", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Thanks for subscribing we will send update to ${email}`);
    setEmail("");
  };

  return (
    <footer className="bg-[#1E222B] text-teal-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
          {/* ---- Left Column ---- */}
          <div className="space-y-6">
            <h2 className="text-4xl sm:text-5xl md:text-5xl font-bold font-sacramento text-teal-400 animate-pulse">
              Cravely
            </h2>

            <p className="text-teal-200/90 text-sm font-sacramento italic">
              Where taste meets convenience, and every bite tells a story.
              <br />
              Experience culinary artistry delivered with care and elegance.
            </p>

            <form onSubmit={handleSubmit} className="relative mt-4 group">
              <div className="flex items-center gap-2 mb-2">
                <FaRegEnvelope className="text-teal-400 animate-pulse" />
                <span className="font-bold text-teal-400">
                  Get Exclusive Offers
                </span>
              </div>

              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-teal-50/5 border-2 border-teal-400/30 focus:outline-none focus:border-teal-400 focus:ring-4 focus:ring-teal-400/20 transition-all duration-300 placeholder:text-teal-200/50 pr-24"
                  required
                />

                <button
                  type="submit"
                  className="absolute right-1 top-1 bg-linear-to-br from-teal-300 via-cyan-500 to-teal-600 text-white px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg hover:shadow-teal-400/30 overflow-hidden transition-all duration-500 cursor-pointer"
                >
                  <span className="font-bold text-sm tracking-wide transition-transform duration-300 group-hover:-translate-x-1">
                    Join Now
                  </span>

                  <BiChevronRight className="text-xl transition-transform duration-300 group-hover:animate-spin shrink-0" />
                  <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-teal-50/30 to-transparent group-hover:translate-x-full transition-transform duration-700" />
                </button>
              </div>
            </form>
          </div>

          {/* ---- Center Column ---- */}
          <div className="flex justify-center">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4 border-l-4 border-teal-400 pl-3 font-merriweather italic text-teal-300">
                Navigation
              </h3>

              <ul className="space-y-3">
                {navItems.map((item) => (
                  <li key={item.name}>
                    {" "}
                    <a
                      href={item.link}
                      className="flex items-center hover:text-teal-400 transition-all group font-lora hover:pl-2"
                    >
                      <BiChevronRight className="mr-2 text-teal-400 group-hover:animate-bounce" />
                      <span className="hover:italic">{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ---- Right Column ---- */}
          <div className="flex justify-center md:justify-end">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold mb-4 border-l-4 border-teal-400 pl-3 font-merriweather italic text-teal-300">
                Social Connect
              </h3>

              <div className="flex space-x-4">
                {socialIcons.map(({ icon: Icon, link, color, label }, idx) => (
                  <a
                    target="_blank"
                    href={link}
                    key={idx}
                    className="text-2xl bg-teal-400/30 p-3 rounded-full hover:bg-teal-400/20 hover:scale-110 transition-all duration-300 relative group"
                    style={{ color }}
                  >
                    <Icon className="hover-scale-125 transition-transform" />
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-teal-400 text-black px-2 py-1 rounded text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* -------- Bottom Section -------- */}
        <div className="border-t border-teal-800 pt-8 mt-8 text-center">
          <p className="text-teal-400 text-lg mb-2 font-playfair">
            &copy; {new Date().getFullYear()} Cravely. All Rights Reserved.
          </p>

          <div className="group inline-block">
            <a
              href="#"
              target="_blank"
              className="text-lg font-sacramento bg-linear-to-r from-teal-400 via-teal-500 to-teal-400 bg-clip-text text-transparent hover:text-purple-300 transition-all duration-500"
            >
              Designed by Cravely
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
