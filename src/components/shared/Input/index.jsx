import PropTypes from "prop-types";
import React from "react";

function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  touched,
  className = "",
  as = "input",
  ...rest
}) {
  const hasError = touched && error;
  const baseClass = `border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 ${
    hasError ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
  } ${className}`;

  return (
    <div className="space-y-1">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      {as === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`${baseClass} resize-y min-h-[100px]`} // <-- control height & allow resize
          {...rest}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={baseClass}
          {...rest}
        />
      )}

      {hasError && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
}

export default Input;
