import React from "react";
export default ({
  className,
  type,
  name,
  handleChange,
  handleBlur,
  value,
  error,
  icon,
  inputStyle,
  iconName,
  iconStyle,
  laylerStyle,
  ...props
}) => {
  return (
    <div className="d-inputContainer" style={{ ...inputStyle }}>
      <input
        type={type}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        className={`d-input ${className}`}
        {...props}
      />
      {icon && iconName ? (
        <i className={`d-icon fa ${iconName}`} style={{ ...iconStyle }}></i>
      ) : (
        <></>
      )}
    </div>
  );
};
