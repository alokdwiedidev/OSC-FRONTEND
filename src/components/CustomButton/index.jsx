import React from "react";
import { Button, CircularProgress } from "@mui/material";
import "./CustomButton.css";

const CustomButton = (props) => {
  const { className, loading, variant, children, ...rest } = props;
  return (
    <Button
      className={`custom-btn ${className ? className : ""} ${
        variant ? "variant" : ""
      }`}
      {...rest}
      disabled={loading}
    >
      {loading ? (
        <span>
          <CircularProgress className="circle-progress" thickness={5}/>
        </span>
      ) : children} 
    </Button>
  );
};

export default CustomButton;
