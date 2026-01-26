import {
  FaBolt,
  FaCalendarCheck,
  FaFire,
  FaInfoCircle,
  FaRegClock,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import AboutImage from "../../assets/AboutImage.png";
import FloatingParticle from "../FloatingParticle/FloatingParticle";
import "./AboutHome.css";

export const aboutfeature = [
  {
    icon: FaBolt,
    title: "Instant Ordering",
    text: "Seamless digital experience",
    color: "from-teal-400 to-cyan-500",
  },
  {
    icon: FaRegClock,
    title: "Always Open",
    text: "24/7 premium service",
    color: "from-fuchsia-400 to-rose-600",
  },
  {
    icon: FaCalendarCheck,
    title: "Exclusive Booking",
    text: "Priority reservations",
    color: "from-teal-400 to-cyan-600",
  },
  {
    icon: FaFire,
    title: "Signature Dishes",
    text: "Chef's special creations",
    color: "from-violet-400 to-blue-600",
  },
];

const AboutHome = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#0C0B10] via-[#1C1B1F] to-[#1F1D23] text-white py-10 sm:py-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-20 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl mix-blend-soft-light" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-400/20 blur-3xl mix-blend-soft-light" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center lg:gap-8 xl:gap-16 relative">
        <div className="w-full order-1 lg:order-2 space-y-8 sm:space-y-12 relative">
          <div className="space-y-4 sm:space-y-8 px-4 sm:px-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
              <span className="font-cursive text-4xl sm:text-5xl md:text-6xl bg-linear-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">
                Culinary Masterpieces
              </span>
              <br />
              <span className="inline-block mt-2 sm:mt-4 text-2xl sm:text-3xl md:text-4xl opacity-90 font-light">
                Where Taste Meets Art & Every Bite Tells a Story
              </span>
            </h2>

            <p className="text-base sm:text-lg md:text-xl opacity-90 leading-relaxed max-w-3xl font-serif italic border-l-4 bg-teal-500/60 pl-4 sm:pl-6 py-2 bg-linear-to-r from-white/5 to-transparent">
              "Every dish we create is a harmony of flavor and artistry,
              designed to delight the senses and leave lasting memories on every
              plate."
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 px-4 sm:px-0">
            {aboutfeature.map((item, i) => (
              <div
                key={i}
                className="group flex flex-col items-center justify-center gap-3 sm:gap-4 transition-transform duration-300 p-4 sm:p-5 hover:translate-x-2"
              >
                <div
                  className={`p-3 sm:p-4 rounded-full bg-linear-to-br ${item.color} transition-transform duration-300 group-hover:scale-110`}
                >
                  <item.icon className="text-2xl sm:text-3xl text-white" />
                </div>

                <div className="text-center">
                  <h3 className="text-xl sm:text-2xl font-bold font-cursive">
                    {item.title}
                  </h3>
                  <p className="opacity-80 text-sm sm:text-base">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 items-center mt-6 sm:mt-8 px-4 sm:px-0">
            <Link
              to="/about"
              className="group relative px-4 sm:px-6 py-2 sm:py-3 bg-linear-to-r from-teal-500 to-cyan-600 rounded-xl font-bold hover:scale-[1.02] transition-transform duration-300 flex items-center gap-2 sm:gap-3"
            >
              <span className="absolute inset-0 bg-linear-to-r from-teal-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <FaInfoCircle className="text-lg sm:text-xl animate-pulse" />
              <span className="font-cursive text-lg sm:text-xl">
                Unveil Our Legacy
              </span>
            </Link>
          </div>
        </div>

        <div className="w-full order-2 lg:-order-1 md:max-w-md lg:max-w-none lg:w-7/12 mt-12 mb-10 lg:mb-0 relative group transform hover:scale-[1.01] transition-all duration-500">
          <div className="relative rounded-[4rem] overflow-hidden border-4 border-teal-900/30 hover:border-teal-600/40 transition-all duration-500 shadow-2xl shadow-black/50">
            <div className="absolute inset-0 bg-linear-to-br from-teal-400/15 via-transparent to-teal-600/10 mix-blend-soft-light" />
            <img
              src={AboutImage}
              alt="Restaurant"
              className="w-full h-auto object-cover aspect-3/4 transform -rotate-1 hover:rotate-0 transition-all duration-500"
            />

            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-4/5 h-16 bg-teal-900/30 blur-3xl z-0" />
          </div>

          <div className="absolute -top-6 -right-6 w-24 h-24 bg-teal-500/10 rounded-full blur-xl" />
        </div>
      </div>

      <FloatingParticle />
    </div>
  );
};

export default AboutHome;
