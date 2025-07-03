import PropTypes from "prop-types";
import React from "react";

function Select({
  label,
  name,
  options = [],
  value,
  onChange,
  onBlur,
  error,
  touched,
  className = "",
  ...rest
}) {
  const hasError = touched && error;

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
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 ${
          hasError ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
        } ${className}`}
        {...rest}
      >
        {options.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {hasError && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  );
}

Select.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  touched: PropTypes.bool,
  className: PropTypes.string,
};

export default Select;
