import PropTypes from "prop-types";
import React from "react";

function Radio({
  name,
  value,
  label,
  checked,
  onChange,
  onBlur,
  className = "",
}) {
  return (
    <label className={`inline-flex items-center space-x-2 ${className}`}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        onBlur={onBlur}
        className="form-radio h-4 w-4 text-blue-600"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string,
};

export default Radio;
