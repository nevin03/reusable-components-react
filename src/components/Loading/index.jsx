import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

const Spinner = ({ size = "md", color = "primary", className = "" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-10 h-10",
  };

  const colorClasses = {
    primary: "text-primary-600",
    secondary: "text-secondary-600",
    gray: "text-gray-600",
    white: "text-white",
  };

  return (
    <div
      className={clsx(
        "animate-spin rounded-full border-4 border-t-transparent",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      role="status"
    />
  );
};

Spinner.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  color: PropTypes.oneOf(["primary", "secondary", "gray", "white"]),
  className: PropTypes.string,
};

export default Spinner;
