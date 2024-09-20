import React from "react";
import formBg from "../../assets/formbackground.png"
import "./CustomFormWrap.css"
import { Grid } from "@mui/material";
import CustomButton from "../CustomButton";

const CustomFormWrap = (props) => {
  const { flip = false, panelTitle, panelDescription, pannelbuttonLabel, onClickPanelButton, children } =
    props;
  return (
    <div>
      <Grid width={'100%'} container direction={flip ? "row" : "row-reverse"}>
        <Grid item sm={7} md={7}>
          <div
            style={{ backgroundImage: `url(${formBg})` }}
            className="text-pannel"
          >
            <div className="text-container">
              <h1 className="pannel-title">{panelTitle}</h1>
              <p className="pannel-desc">{panelDescription}</p>
              <CustomButton variant onClick={() => onClickPanelButton()} className="pannel-btn">{pannelbuttonLabel}</CustomButton>
            </div>
          </div>
        </Grid>
        <Grid item sm={5} md={5}>
          <div
            className={`${
              flip ? "add-margin-left" : "add-margin-right"
            } form-container`}
          >
            {children}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default CustomFormWrap;
