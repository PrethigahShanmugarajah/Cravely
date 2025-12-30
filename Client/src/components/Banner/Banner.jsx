// Cravely / Client / src / components / Banner / Banner.jsx
import { useState } from "react";
import { FaDownload, FaPlay, FaTimes } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { bannerAssets } from "../../assets/dummydata";

const Banner = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showVideo, setShowVideo] = useState(false);

  const { bannerImage, orbitImages, video } = bannerAssets;

  const handleSearch = () => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="relative">
      <div className="bg-linear-to-br from-teal-900 via-teal-800 to-teal-700 text-white py-16 px-4 sm:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-teal-900/20 to-teal-700/10" />
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          {/* -------- Left Content -------- */}
          <div className="flex-1 space-y-8 relative md:pr-8 lg:pr-19 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-4xl lg:text-6xl font-bold leading-tight font-serif drop-shadow-md">
              We're Here <br />
              <span className="text-teal-400 bg-linear-to-r from-teal-400 to-teal-300 bg-clip-text">
                For Food & Delivery
              </span>
            </h1>

            <p className="text-lg md:text-lg lg:text-xl font-playfair italic sm:text-xl text-teal-100 max-w-xl opacity-90 mx-auto md:mx-0">
              Best cooks and best delivery guys all at your service. Hot tasty
              food will reach you in 60 minutes.
            </p>

            <form
              onSubmit={handleSearch}
              className="relative max-w-2xl mx-auto md:mx-0 group"
            >
              <div className="relative flex items-center bg-teal-900/30 rounded-xl border-2 border-teal-500/30 shadow-2xl hover:bg-teal-400/50 transition-all duration-300">
                <div className="pl-6 pr-3 py-4">
                  <FiSearch className="text-xl text-teal-400/80" />
                </div>

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Discover your next favourite meal..."
                  className="w-full pr-6 bf-transparent outline-none placeholder:teal-200/70 text-lg font-medium tracking-wide"
                />

                <button
                  type="submit"
                  className="mr-4 px-6 py-3 bg-linear-to-r from-teal-400 to-teal-300 rounded-lg font-semibold text-teal-900 hover:from-teal-300 hover:to-teal-200 transition-all duration-300 shadow-lg hover:shadow-teal-300/20 cursor-pointer"
                >
                  Search
                </button>
              </div>
            </form>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start top-6">
              <button className="group flex items-center gap-3 bg-teal-800/30 hover:bg-teal-800/50 px-6 py-3 rounded-xl transition-all duration-300 border-2 border-teal-700/50 hover:border-teal-400 backdrop-blur-xl cursor-pointer">
                <FaDownload className="text-xl text-teal-400 group-hover:animate-bounce" />
                <span className="text-lg">Download App</span>
              </button>

              <button
                onClick={() => setShowVideo(true)}
                className="group flex items-center gap-3 bg-linear-to-r from-teal-400 to-teal-300 hover:from-teal-300 hover:to-teal-200 px-6 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-teal-300/30 cursor-pointer"
              >
                <FaPlay className="text-xl text-teal-900" />
                <span className="text-lg text-teal-900 font-semibold">
                  Watch Video
                </span>
              </button>
            </div>
          </div>

          {/* -------- Right Content -------- */}
          <div className="flex-1 relative group mt-8 md:mt-0 min-h-75 sm:min-h-100">
            {/* ---- Main Image ---- */}
            <div className="relative rounded-full p-1 bg-linear-to-br from-teal-700 via-teal-800 to-teal-400 shadow-2xl z-20 w-62.5 xs:w-[300px] sm:w-87.5 xs:h-[250px] sm:h-87.5 mx-auto">
              <img
                src={bannerImage}
                alt="Banner Image"
                className="rounded-full border-4 xs:border-8 border-teal-900/50 w-full h-full object-cover object-top"
              />

              <div className="absolute inset-0 rounded-full bg-linear-to-b from-transparent to-teal-900/40 mix-blend-multiply" />
            </div>

            {/* ---- Orbital Images ---- */}
            {orbitImages.map((imgSrc, index) => (
              <div
                key={index}
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${
                  index === 0 ? "orbit" : `orbit-delay-${index * 5}`
                } w-20 xs:w-[100px] sm:w-37.5 h-20 xs:h-[100px] sm:h-37.5`}
              >
                <img
                  src={imgSrc}
                  alt={`Orbiting ${index + 1}`}
                  className="w-full h-full rounded-full border border-teal-500/30 shadow-lg bg-teal-900/20 p-1 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Video Modal ---- */}
      {showVideo && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/90 backdrop-blur-lg p-4">
          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-6 right-6 text-teal-400 hover:text-teal-300 text-3xl z-10 transition-all cursor-pointer"
          >
            &times;
          </button>

          <div className="w-full max-w-4xl mx-auto">
            <video
              controls
              autoPlay
              className="w-full aspect-video object-contain rounded-lg shadow-2xl"
            >
              <source src={video} type="video/mp4" />
            </video>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
