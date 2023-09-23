import React from "react";

interface InputProps {
  values: any;
  handleChange: any;
  handleBlur: any;
  touched: any;
  errors: any;
  name: string;
  isNameFocused: boolean;
  handleNameFocus: any;
}
function Input({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
  name,
  isNameFocused,
  handleNameFocus,
}: InputProps) {
  return (
    <>
      <div className="relative ">
        <input
          type="text"
          className={`bg-transparent border border-white w-full my-3 py-4 rounded-sm border-opacity-20 pl-2 h-16 ${
            isNameFocused || name ? "pt-6" : ""
          } ${
            touched.name && errors.name ? "border-red-500 outline-red-700" : ""
          } `}
          // placeholder="Name"
          name="name"
          id="name"
          value={values.name}
          onChange={handleChange}
          onFocus={handleNameFocus}
          onBlur={handleBlur}
        />

        <label
          className={`absolute left-2 bottom-7 transition-all transform ${
            isNameFocused || name ? "-translate-y-6 text-xs" : ""
          } ${isNameFocused ? "text-primary" : "text-gray-500"} ${
            touched.name && errors.name ? "text-red-500" : ""
          }`}
        >
          Name
        </label>
      </div>
      {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}
    </>
  );
}

export default Input;
