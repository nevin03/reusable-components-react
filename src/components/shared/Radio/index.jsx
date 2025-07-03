import PropTypes from "prop-types";

function Radio({ field, label, className = "", ...rest }) {
  return (
    <label className={`inline-flex items-center space-x-2 ${className}`}>
      <input
        type="radio"
        {...field}
        {...rest}
        className="form-radio h-4 w-4 text-blue-600"
      />
      <span className="text-sm text-gray-700">{label}</span>
    </label>
  );
}

Radio.propTypes = {
  field: PropTypes.object,
  label: PropTypes.string.isRequired,
  name: PropTypes.string,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Radio;
