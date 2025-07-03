// src/components/shared/Checkbox/index.jsx
import PropTypes from "prop-types";
import React from "react";

function Checkbox({ name, value, label, checked, onChange, className = "" }) {
  return (
    <label className={`inline-flex items-center space-x-2 ${className}`}>
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="form-checkbox h-4 w-4 text-blue-600"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default Checkbox;
