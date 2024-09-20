import React from "react";
import "./TextInput.css"

const TextInput = (props) => {
  const { name, value, className, wrapperClass, errorClass, error, ...rest } = props;
  return (
    <div className={`input-wrap ${wrapperClass ? wrapperClass : ""}`}>
      <input
        className={`text-input ${className ? className : ""} ${
          error ? "error-border-styles" : ""
        }`}
        name={name}
        value={value}
        {...rest}
      />
        <div className={`error-root ${errorClass ? errorClass : ''}`}>
         {error ? <h4>{error}</h4> : null}
        </div>
    </div>
  );
}

export default TextInput;
