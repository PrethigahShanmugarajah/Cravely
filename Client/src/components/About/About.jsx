// Craverly / Client / src / components / About / About.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { features, stats, teamMembers } from "../../assets/dummydata";
import {
  FaTwitter,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
} from "react-icons/fa";

const socialIcons = {
  twitter: <FaTwitter className="h-6 w-6" />,
  instagram: <FaInstagram className="h-6 w-6" />,
  facebook: <FaFacebookF className="h-6 w-6" />,
  linkedin: <FaLinkedinIn className="h-6 w-6" />,
};

const About = () => {
  const [hoveredStat, setHoveredStat] = useState(null);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#111827] via-[#3B3B4F] to-[#111827] text-teal-50 overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 mix-blend-soft-light" />
      <motion.section
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-16 px-4 text-center relative"
      >
        <div className="max-w-4xl mx-auto">
          <motion.h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-4 font-serif bg-clip-text text-transparent bg-linear-to-r from-teal-500 to-lime-600">
            Flavors on the Go
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Experience gourmet delights delivered fresh to your door, bringing
            restaurant-quality meals to every table.
          </motion.p>
        </div>
      </motion.section>

      <section className="py-12 px-4 md:px-8 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                transition={{ delay: i * 0.2 }}
                className="relative group"
              >
                <div className="absolute -indent-1 bg-linear-to-br from-teal-600/30 to-teal-500/30 rounded-3xl blur-lg opacity-50 group-hover:opacity-80 transition-opacity duration-500" />

                <div className="relative bg-[#3B3B4F]/90 backdrop-blur-lg rounded-3xl overflow-hidden border border-teal-600/30 hover:border-teal-500 transition-all duration-300 h-full">
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={f.img}
                      alt={f.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-[#111827] via-transparent to-transparent" />
                  </div>

                  <div className="p-8">
                    <motion.div
                      className="text-teal-500 mb-4 inline-block"
                      whileHover={{ rotate: 15 }}
                    >
                      <Icon className="w-12 h-12 text-teal-500" />

                      <h3 className="text-2xl font-bold mb-2 text-teal-100">
                        {f.title}
                      </h3>

                      <p className="text-teal-100/80">{f.text}</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 bg-linear-to-br from-[#111827] to-[#3B3B4F]/90">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 * 0.2, type: "spring" }}
                className="relative group h-48"
                onHoverStart={() => setHoveredStat(i)}
                onHoverEnd={() => setHoveredStat(null)}
                animate={{
                  scale: hoveredStat === i ? 1.05 : 1,
                  zIndex: hoveredStat === i ? 10 : 1,
                }}
              >
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    y: [0, -15, 0],
                    transition: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.3,
                    },
                  }}
                >
                  <div className="relative h-full bg-[#3B3B4F]/40 backdrop-blur-lg rounded-xl border-2 border-teal-600/30 p-6 overflow-hidden transition-all duration-300">
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      animate={{
                        background: [
                          "linear-gradient(45deg, #3B3B4F 0%, #111827 50%, #34344D 100%)",
                          "linear-gradient(45deg, #3B3B4F 0%, #111827 80%, #34344D 100%)",
                          "linear-gradient(45deg, #3B3B4F 0%, #111827 50%, #34344D 100%)",
                        ],
                      }}
                      transition={{ duration: 6, repeat: Infinity }}
                    />

                    <div className="absolute inset-0 rounded-xl shadow-lg shadow-teal-900/20" />

                    <div className="relative z-10 h-full flex flex-col items-center justify-center">
                      <motion.div
                        className="mb-4 rounded-full bg-teal-900/30 border border-teal-700/30"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                      >
                        <Icon className="w-8 h-8 text-teal-500/90" />
                      </motion.div>

                      <div className="text-4xl font-bold mb-1 bg-clip-text bg-linear-to-r from-teal-200 to-teal-400 text-transparent">
                        {s.number}
                      </div>

                      <motion.div
                        className="text-sm uppercase tracking-widest font-medium text-teal-100/80"
                        animate={{
                          letterSpacing: hoveredStat === i ? "0.15em" : "0.1em",
                          textShadow:
                            hoveredStat === i
                              ? "0 0  8px rgba(20,184,166,0.4)"
                              : "none",
                        }}
                      >
                        {s.label}
                      </motion.div>
                    </div>

                    <motion.div
                      className="absolute inset-0 bg-teal-900/10 rounded-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredStat === i ? 1 : 0 }}
                    />
                  </div>
                </motion.div>

                <motion.div
                  className="absolute inset-x-4 bottom-0 h-8 bg-teal-900/30 blur-xl rounded-full"
                  animate={{
                    opacity: hoveredStat === i ? 0.4 : 0.2,
                    scale: hoveredStat === i ? 0.9 : 0.8,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="py-16 px-4 md:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-serif sm:text-5xl md:text-6xl font-bold text-center mb-12 text-teal-100"
          >
            Discover the{" "}
            <span className="text-teal-500">Masters Behind the Flavors</span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
            {teamMembers.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                transition={{ delay: m.delay }}
                className="relative group"
              >
                <div className="relative h-full bg-[#3B3B4F]/90 backdrop-blur-lg rounded-3xl overflow-hidden border-2 border-teal-600/30 hover:border-teal-500 transition-all duration-500 shadow-2xl hover:shadow-2xl hover:shadow-teal-500/20">
                  <div className="relative h-64 sm:h-72 md:h-96 overflow-hidden">
                    <motion.img
                      src={m.img}
                      alt={m.name}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  <div className="p-8 text-center flex flex-col h-[cal(100%-24rem)]">
                    <div className="mb-4">
                      <h3 className="text-3xl font-bold mb-2 text-teal-100">
                        {m.name}
                      </h3>

                      <p className="text-teal-500 text-lg font-medium font-cursive">
                        {m.role}
                      </p>
                    </div>

                    <p className="text-teal-100/80 text-lg font-cursive grow">
                      {m.bio}
                    </p>

                    <motion.div
                      className="flex justify-center gap-4 pt-6"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                    >
                      {Object.entries(m.social).map(([p, url]) => (
                        <a
                          key={p}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-teal-500 hover:text-teal-400 transition-colors duration-300 hover:scale-110"
                        >
                          {/* {{
                            twitter: <FaTwitter className="h-6 w-6" />,
                            instagram: <FaInstagram className="h-6 w-6" />,
                            facebook: <FaFacebookF className="h-6 w-6" />,
                            linkedin: <FaLinkedinIn className="h-6 w-6" />,
                          }} */}
                          {socialIcons[p]}
                        </a>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
