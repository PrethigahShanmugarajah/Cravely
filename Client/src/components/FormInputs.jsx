import { Controller } from "react-hook-form";
import Select from "react-select";
import { FiUpload } from "react-icons/fi";

export const Input = ({
  label,
  name,
  type = "text",
  control,
  placeholder,
  required = false,
  errors,
  className = "",
  noFocusRing = false,
  step,
  min,
}) => {
  const focusClasses = noFocusRing
    ? ""
    : "focus:ring-1 focus:ring-teal-500/50 focus:outline-none";

  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-2 text-base sm:text-lg text-teal-400">
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field }) =>
          type === "textarea" ? (
            <textarea
              {...field}
              placeholder={placeholder}
              className={`w-full bg-[#2C2F3F]/50 border border-teal-500/20 rounded-xl px-4 py-3 sm:px-5 sm:py-4 focus:outline-none focus:border-teal-400 text-teal-100 resize-none ${focusClasses} ${className}`}
            />
          ) : (
            <input
              {...field}
              type={type}
              placeholder={placeholder}
              step={step}
              min={min}
              className={`w-full bg-[#2C2F3F]/50 border border-teal-500/20 rounded-xl px-4 py-3 sm:px-5 sm:py-4 focus:outline-none focus:border-teal-400 text-teal-100 ${focusClasses} ${className}`}
            />
          )
        }
      />
      {errors && errors[name] && (
        <span className="text-red-500 text-sm mt-1">{label} is required</span>
      )}
    </div>
  );
};

export const SelectInput = ({
  label,
  name,
  control,
  options = [],
  required = false,
  errors,
  themeColor = "#0D9488",
  className = "",
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className="block mb-2 text-base sm:text-lg text-teal-400">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            placeholder={`Select ${label}`}
            isSearchable
            value={options.find((opt) => opt.value === field.value) || null}
            onChange={(selected) => field.onChange(selected?.value)}
            styles={{
              control: (base, state) => ({
                ...base,
                backgroundColor: "#2C2F3F",
                borderColor: state.isFocused ? themeColor : "#0D948833",
                boxShadow: state.isFocused
                  ? `0 0 0 2px rgba(13,148,136,0.2)`
                  : "none",
                borderRadius: "12px",
                minHeight: "57px",
                paddingLeft: "12px",
                paddingRight: "12px",
                cursor: "pointer",
                "&:hover": { borderColor: themeColor },
              }),
              singleValue: (base) => ({ ...base, color: "#F0F9FF" }),
              menu: (base) => ({
                ...base,
                backgroundColor: "#2C2F3F",
                borderRadius: "12px",
                zIndex: 50,
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused
                  ? "rgba(13,148,136,0.2)"
                  : state.isSelected
                    ? themeColor
                    : "#2C2F3F",
                color: state.isSelected ? "#fff" : "#F0F9FF",
                cursor: "pointer",
                padding: "12px 16px",
              }),
              placeholder: (base) => ({ ...base, color: "#9CA3AF" }),
              indicatorSeparator: () => ({ display: "none" }),
              dropdownIndicator: (base) => ({ ...base, color: themeColor }),
            }}
          />
        )}
      />

      {errors && errors[name] && (
        <span className="text-red-500 text-sm mt-1">{label} is required</span>
      )}
    </div>
  );
};

export const FileInput = ({
  label,
  name,
  control,
  required = false,
  errors,
  onChange,
  preview,
  className = "",
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-2 text-sm font-medium text-teal-400">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field }) => (
          <div className={`flex justify-center`}>
            <label
              className={`w-full max-w-xs sm:w-72 h-56 sm:h-72 bg-[#2C2F3F]/50 border border-dashed border-teal-500/30 rounded-2xl cursor-pointer flex items-center justify-center overflow-hidden hover:border-teal-400 transition-all ${className}`}
            >
              {preview ? (
                <img
                  src={preview}
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
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  field.onChange(file);
                  if (onChange && file) onChange(file);
                }}
              />
            </label>
          </div>
        )}
      />
      {errors && errors[name] && (
        <span className="text-red-500 text-sm mt-1">{label} is required</span>
      )}
    </div>
  );
};

export const CheckboxInput = ({
  label,
  name,
  control,
  required = false,
  errors,
}) => {
  return (
    <div className="mb-4 flex items-center gap-2">
      <Controller
        name={name}
        control={control}
        rules={{ required }}
        render={({ field }) => (
          <input
            type="checkbox"
            {...field}
            checked={field.value || false}
            className="h-4 w-4 text-teal-500 border-gray-300 rounded focus:ring-1 focus:ring-teal-500/50"
          />
        )}
      />
      <label className="text-sm text-black">{label}</label>
      {errors && errors[name] && (
        <span className="text-red-500 text-sm mt-1 block">
          {label} is required
        </span>
      )}
    </div>
  );
};

export const MultiCheckboxInput = ({
  label,
  name,
  control,
  options = [],
  required = false,
  errors,
}) => {
  return (
    <div className="mb-4">
      <p className="text-sm font-medium text-black mb-1">{label}</p>
      {options.map((opt) => (
        <div key={opt.value} className="flex items-center gap-2 mb-1">
          <Controller
            name={name}
            control={control}
            rules={{ required }}
            render={({ field }) => {
              const isChecked = field.value?.includes(opt.value) || false;
              return (
                <input
                  type="checkbox"
                  value={opt.value}
                  checked={isChecked}
                  onChange={(e) => {
                    if (e.target.checked) {
                      field.onChange([...(field.value || []), opt.value]);
                    } else {
                      field.onChange(
                        field.value.filter((v) => v !== opt.value),
                      );
                    }
                  }}
                  className="h-4 w-4 text-teal-500 border-gray-300 focus:ring-1 focus:ring-teal-500/50"
                />
              );
            }}
          />
          <label className="text-sm text-black">{opt.label}</label>
        </div>
      ))}
      {errors && errors[name] && (
        <span className="text-red-500 text-sm mt-1">{label} is required</span>
      )}
    </div>
  );
};

export const RadioInput = ({
  label,
  name,
  control,
  options = [],
  required = false,
  errors,
}) => {
  return (
    <div className="mb-4">
      <p className="text-sm font-medium text-black mb-1">{label}</p>
      {options.map((opt) => (
        <div key={opt.value} className="flex items-center gap-2 mb-1">
          <Controller
            name={name}
            control={control}
            rules={{ required }}
            render={({ field }) => (
              <input
                type="radio"
                {...field}
                value={opt.value}
                checked={field.value === opt.value}
                className="h-4 w-4 text-teal-500 border-gray-300 focus:ring-1 focus:ring-teal-500/50"
              />
            )}
          />
          <label className="text-sm text-black">{opt.label}</label>
        </div>
      ))}
      {errors && errors[name] && (
        <span className="text-red-500 text-sm mt-1">{label} is required</span>
      )}
    </div>
  );
};
