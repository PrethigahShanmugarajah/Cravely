// Cravely / Client / src / components / Contact / Contact.jsx
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  FiArrowRight,
  FiGlobe,
  FiMail,
  FiMapPin,
  FiMessageSquare,
  FiPhone,
} from "react-icons/fi";
import { contactFormFields } from "../../assets/dummydata";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    dish: "",
    query: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Form Submitted:`, formData);
    toast.success("Your query has been submitted successfully!", {
      style: {
        border: "2px solid #0E7490",
        padding: "16px",
        color: "#FFFFFF",
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(10px)",
      },
      iconTheme: { primary: "#0E7490", secondary: "#FFFFFF" },
    });
    setFormData({
      name: "",
      phone: "",
      email: "",
      address: "",
      dish: "",
      query: "",
    });
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen bg-linear-to-r from-cyan-900 via-teal-900 to-zinc-900 animate-gradient-x py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 font[Poppins] relative overflow-hidden">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 4000 }}
      />

      {/* -------- Additional Decorative Element -------- */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-cyan-500/20 rounded-full animate-float" />

      <div className="absolute bottom-40 right-20 w-16 h-16 bg-emerald-500/20 rounded-full animate-float-delayed" />

      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-8 animate-fade-in-down">
          <span className="bg-clip-text text-transparent bg-linear-to-r  from-teal-400 to-cyan-300">
            Connect With Us
          </span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ---- Contact Info Section ---- */}
          <div className="space-y-6">
            <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl transform transition-all duration-300 hover:scale-[1.02] animate-card-float border-l-4 border-teal-500 hover:border-teal-400 group">
              <div className="absolute inset-0 bg-linear-to-r from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

              <div className="flex items-center mb-4 relative z-10">
                <div className="p-3 bg-linear-to-br from-teal-500/30 to-teal-700/30 rounded-xl">
                  <FiMapPin className="text-teal-400 text-2xl animate-pulse" />
                </div>

                <h3 className="ml-4 text-teal-100 text-xl font-semibold">
                  Our Headquater
                </h3>
              </div>

              <div className="pl-12 relative z-10">
                <p className="text-teal-100 font-light text-lg">
                  Lorem, ipsum.
                </p>
              </div>
            </div>

            <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl transform transition-all duration-300 hover:scale-[1.02] animate-card-float border-l-4 border-emerald-500 hover:border-emerald-400 group">
              <div className="absolute inset-0 bg-linear-to-r from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

              <div className="flex items-center mb-4 relative z-10">
                <div className="p-3 bg-linear-to-br from-emerald-500/10 to-transparent rounded-xl">
                  <FiPhone className="text-emerald-400 text-2xl animate-ping" />
                </div>

                <h3 className="ml-4 text-emerald-100 text-xl font-semibold">
                  Contact Number
                </h3>
              </div>

              <div className="pl-12 relative space-y-2 z-10">
                <p className="text-teal-100 font-light flex items-center">
                  <FiGlobe className="text-emerald-400 text-xl mr-2" />
                  +94 12 345 6789
                </p>
              </div>
            </div>

            <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl transform transition-all duration-300 hover:scale-[1.02] animate-card-float border-l-4 border-cyan-500 hover:border-cyan-400 group">
              <div className="absolute inset-0 bg-linear-to-r from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

              <div className="flex items-center mb-4 relative z-10">
                <div className="p-3 bg-linear-to-br from-cyan-500/30 to-teal-700/30 rounded-xl">
                  <FiMail className="text-cyan-400 text-2xl animate-pulse" />
                </div>

                <h3 className="ml-4 text-cyan-100 text-xl font-semibold">
                  Email Address
                </h3>
              </div>

              <div className="pl-12 relative z-10">
                <p className="text-cyan-100 font-light text-lg">
                  cravely@cravely.com
                </p>
              </div>
            </div>
          </div>

          {/* ---- Contact Form ---- */}
          <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-2xl animate-slide-in-right border-2 border-teal-500/30 hover:border-teal-500/50 transform-border duration-300">
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-teal-500/30 rounded-full animate-ping-slow" />

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              {contactFormFields.map(
                ({ label, name, type, placeholder, pattern, Icon }) => (
                  <div key={name}>
                    <label className="block text-teal-100 text-sm font-medium mb-2">
                      {label}
                    </label>

                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                        <Icon className="text-teal-500 text-xl animate-pulse" />
                      </div>

                      <input
                        type={type}
                        value={formData[name]}
                        name={name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 bg-white/10 border-2 border-teal-500/30 rounded-xl text-teal-50 focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder:text-teal-200/50"
                        placeholder={placeholder}
                        pattern={pattern}
                        required
                      />
                    </div>
                  </div>
                )
              )}

              <div>
                <label className="block text-teal-100 text-sm font-medium mb-2">
                  Your Query
                </label>

                <div className="relative">
                  <div className="absolute left-3 top-4">
                    <FiMessageSquare className="text-teal-500 text-xl animate-pulse" />
                  </div>

                  <textarea
                    rows="4"
                    name="query"
                    value={formData.query}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border-2 border-teal-500/30 rounded-xl text-teal-50 focus:ring-2 focus:ring-teal-500 focus:border-transparent placeholder:text-teal-200/50"
                    placeholder="Type your message here..."
                    required
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-linear-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-teal-500/20 flex items-center justify-center space-x-2 group cursor-pointer"
              >
                <span>Submit Query</span>
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
