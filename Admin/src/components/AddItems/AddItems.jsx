// Cravely / Admin / src / components / AddItems / AddItems.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiHeart, FiStar } from "react-icons/fi";
import api from "../../api/axios";
import API_ROUTES from "../../api/api_route";
import { FaRupeeSign } from "react-icons/fa";
import { FileInput, Input, SelectInput } from "../FormInputs";
import { toast } from "react-toastify";

const AddItems = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    rating: 0,
    hearts: 0,
    total: 0,
    image: null,
    preview: "",
  });

  const {
    control,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      price: "",
      rating: 0,
      hearts: 0,
      total: 0,
      image: null,
    },
  });

  const [categories] = useState([
    "Breakfast",
    "Lunch",
    "Dinner",
    "Maxicon",
    "Desserts",
    "Drinks",
  ]);

  const [hoverRating, setHoverRating] = useState(0);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       image: file,
  //       preview: URL.createObjectURL(file),
  //     }));
  //   }
  // };

  const handleRating = (rating) => setFormData((prev) => ({ ...prev, rating }));

  const handleHearts = () =>
    setFormData((prev) => ({ ...prev, hearts: prev.hearts + 1 }));

  const handleItemSubmit = async (formValues) => {
    // e.preventDefault();

    try {
      const payload = new FormData();
      // Object.entries(formData).forEach(([key, val]) => {
      //   if (key === "preview") return;
      //   payload.append(key, val);
      // });

      Object.entries(formValues).forEach(([key, val]) => {
        if (key === "preview" || key === "image") return;
        payload.append(key, val);
      });

      if (formData.image) {
        payload.append("image", formData.image);
      }

      const { data } = await api.post(API_ROUTES.ITEM.ITEM_CREATE, payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // setFormData({
      //   name: "",
      //   description: "",
      //   category: "",
      //   price: "",
      //   rating: 0,
      //   hearts: 0,
      //   total: 0,
      //   image: null,
      //   preview: "",
      // });

      console.log("Add Item API Response:", data);

      if (data.success) {
        toast.success(data.message);
        console.log("Add Item Success:", data.message);

        reset({
          name: "",
          description: "",
          category: "",
          price: "",
          rating: 0,
          hearts: 0,
          total: 0,
          image: null,
        });

        setFormData({
          name: "",
          description: "",
          category: "",
          price: "",
          rating: 0,
          hearts: 0,
          total: 0,
          image: null,
          preview: "",
        });

        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput) fileInput.value = "";
      } else {
        toast.warn(data.message);
        console.log("Add Item Data Error:", data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
      console.log("Add Item Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#111827] via-[#1F2937] to-[#293548] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#3F3F46]/80 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-2xl border border-teal-500/20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 bg-linear-to-r from-teal-300 to-teal-500 bg-clip-text text-transparent text-center">
            Add New Menu Item
          </h2>

          <form
            className="space-y-6 sm:space-y-8"
            onSubmit={handleSubmit(handleItemSubmit)}
          >
            {/* <div className="flex justify-center">
              <label className="w-full max-w-xs sm:w-72 h-56 sm:h-72 bg-[#2C2F3F]/50 border border-dashed border-teal-500/30 rounded-2xl cursor-pointer flex items-center justify-center overflow-hidden hover:border-teal-400 transition-all">
                {formData.preview ? (
                  <img
                    src={formData.preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-4">
                    <FiUpload className="text-3xl sm:text-4xl text-teal-500 mb-2 mx-auto animate-pulse" />
                    <p className="text-teal-400 text-sm">
                      Click to upload product
                    </p>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  required
                />
              </label>
            </div> */}

            <FileInput
              name="image"
              control={control}
              required
              preview={formData.preview}
              onChange={(file) => {
                setFormData((prev) => ({
                  ...prev,
                  image: file,
                  preview: URL.createObjectURL(file),
                }));
              }}
              className=""
            />

            <div className="space-y-6">
              <div>
                {/* <label className="block mb-2 text-base sm:text-lg text-teal-400">
                  Item Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-[#2C2F3F]/50 border border-teal-500/20 rounded-xl px-4 py-3 sm:px-5 sm:py-4 focus:outline-none focus:border-teal-400 text-teal-100"
                  placeholder="Item Name"
                  required
                /> */}

                <Input
                  label="Item Name"
                  name="name"
                  type="text"
                  placeholder="Item Name"
                  control={control}
                  required={true}
                  // errors={errors}
                  className=""
                />
              </div>

              <div>
                {/* <label className="block mb-2 text-base sm:text-lg text-teal-400">
                  Description
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full bg-[#2C2F3F]/50 border border-teal-500/20 rounded-xl px-4 py-3 sm:px-5 sm:py-4 focus:outline-none focus:border-teal-400 text-teal-100 h-32 sm:h-40"
                  placeholder="Description"
                  required
                /> */}

                <Input
                  label="Description"
                  name="description"
                  type="textarea"
                  placeholder="Description"
                  control={control}
                  required={true}
                  // errors={errors}
                  className="h-32 sm:h-40"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  {/* <label className="block mb-2 text-base sm:text-lg text-teal-400">
                    Category
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full bg-[#2C2F3F]/50 border border-teal-500/20 rounded-xl px-4 py-3 sm:px-5 sm:py-4 focus:outline-none focus:border-teal-400 text-teal-100"
                    required
                  >
                    <option value="">Select Category</option>

                    {categories.map((c) => (
                      <option key={c} value={c} className="bg-[#2C2F3F]">
                        {c}
                      </option>
                    ))}
                  </select> */}

                  <SelectInput
                    label="Category"
                    name="category"
                    control={control}
                    options={categories.map((c) => ({ value: c, label: c }))}
                    required={true}
                    // errors={errors}
                    themeColor="#0D9488"
                    className=""
                  />
                </div>

                <div>
                  <label className="block mb-2 text-base sm:text-lg text-teal-400">
                    Price
                  </label>

                  <div className="relative">
                    <FaRupeeSign className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-500 text-lg sm:text-xl" />
                    {/* <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full bg-[#2C2F3F]/50 border border-teal-500/20 rounded-xl px-4 py-3 sm:px-5 sm:py-4 focus:outline-none focus:border-teal-400 text-teal-100 pl-10 sm:pl-12"
                      placeholder="Price"
                      min="0"
                      step="0.01"
                      required
                    /> */}

                    <Input
                      label=""
                      name="price"
                      type="number"
                      control={control}
                      placeholder="Price"
                      required
                      // errors={errors}
                      min={0}
                      step={0.01}
                      className="pl-10 sm:pl-12"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block mb-2 text-base sm:text-lg text-teal-400">
                    Rating
                  </label>

                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="text-2xl sm:text-3xl transition-transform hover:scale-110 cursor-pointer"
                      >
                        <FiStar
                          className={
                            star <= (hoverRating || formData.rating)
                              ? "text-teal-400 fill-current"
                              : "text-teal-100/30"
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-base sm:text-lg text-teal-400">
                    Popularity
                  </label>

                  <div className="flex items-center gap-3 sm:gap-4">
                    <button
                      type="button"
                      onClick={handleHearts}
                      className="text-2xl sm:text-3xl text-teal-400 hover:text-teal-300 transition-colors animate-pulse"
                    >
                      <FiHeart />
                    </button>

                    {/* <input
                      type="number"
                      name="hearts"
                      value={formData.hearts}
                      onChange={handleInputChange}
                      className="w-full bg-[#2C2F3F]/50 border border-teal-500/20 rounded-xl px-4 py-3 sm:px-5 sm:py-4 focus:outline-none focus:border-teal-400 text-teal-100 pl-10 sm:pl-12"
                      placeholder="Enter Likes"
                      min="0"
                      required
                    /> */}

                    <div className="flex-1">
                      <Input
                        label=""
                        name="hearts"
                        type="number"
                        control={control}
                        placeholder="Enter Likes"
                        required={true}
                        // errors={errors}
                        className="pl-10 sm:pl-12"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-linear-to-r from-teal-600 to-teal-700 text-white px-6 sm:px-8 py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg transition-all hover:shadow-2xl hover:shadow-teal-500/30 hover:scale-[1.02] active:scale-95 mt-6 cursor-pointer"
              >
                Add to Menu
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItems;
