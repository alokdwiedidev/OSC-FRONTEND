import React, { useState } from "react";
import CustomFormWrap from "../../components/CustomFormWrap";
import wavebg from "../../assets/imageedit_2_3611863364.png";
import "./Login.css";
import { Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import TextInput from "../../components/TextInput";
import BaseHeader from "../../components/BaseHeader";
import { DEVICE_TYPE, URLS } from "../../constants";
import ForgotPasswordModal from "../../components/ForgotPassModal";
import CustomButton from "../../components/CustomButton";
import { handleAlerts } from "../../utils/helpers";
import {loginValidationSchema} from "../../validations"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { handleIsLoggedIn } from "../../redux/dashboardSlice";
import { apiClient } from "../../api/apiClient";
import useLoader from "../../customHooks/useLoader";

const Login = (props) => {
  const [openFgtModal, setOpenFgtModal] = useState(false);
  const navigate = useNavigate();
  const { isLoading, handleLoading } = useLoader();
  const userData = JSON.parse(localStorage.getItem("userData"))
  const dispatch = useDispatch()

  // useEffect(() => {
  //   if(userData?.userId && userData?.sessionId) {
  //     navigate("/dashboard")
  //   }
  // },[userData, navigate])

  const onClickSignUp = () => {
    navigate("/sign-up?step=1");
  };

  const getErrorsBasedOnCode = (errorCode) => {
    switch (errorCode) {
      case 201:
        return "USERNAME OR PASSWORD IS INVALID";
      case 202:
        return "USERNAME OR PASSWORD IS INVALID";
      case 204:
        return "USER ALREADY LOGGED IN";
      case 205:
        return "YOUR ACCOUNT HAS BEEN LOCKED";
      default:
        return "SOMETHING WENT WRONG";
    }
  };

  return (
    <>
      <BaseHeader />
      <div style={{ backgroundImage: `url(${wavebg})` }} className="login-root">
        <CustomFormWrap
          panelTitle="HELLO!"
          panelDescription="Enter your details and start the shopping with us."
          pannelbuttonLabel="SIGN UP"
          onClickPanelButton={onClickSignUp}
        >
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            onSubmit={async (values, { resetForm }) => {
              //@todo api integration
              handleLoading(true);
              const payload = {
                userId: values?.username,
                password: values?.password,
                loginDevice: DEVICE_TYPE,
              };
              const response = await apiClient.post(URLS.LOGIN, payload);
              if (response.code === 200) {
                handleLoading(false);
                const userData = JSON.parse(localStorage.getItem("userData"));
                const updatedUserData = {
                  ...userData,
                  userId: values?.username,
                  sessionId: response.dataObject.sessionId,
                  fullName: response.dataObject.name,
                };
                localStorage.setItem(
                  "userData",
                  JSON.stringify(updatedUserData)
                );
                dispatch(handleIsLoggedIn(true))
                navigate("/dashboard");
                window.location.reload()
                resetForm();
              } else {
                handleLoading(false);
                handleAlerts(
                  "Error!",
                  getErrorsBasedOnCode(response.code),
                  "error"
                );
              }
            }}
            validationSchema={loginValidationSchema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form className="login-container" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <TextInput
                  name="username"
                  type="text"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeHolder="User ID"
                  error={
                    errors.username && touched.username ? errors.username : ""
                  }
                  errorClass="error"
                />
                <TextInput
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeHolder="Password"
                  error={
                    errors.password && touched.password ? errors.password : ""
                  }
                  errorClass="error"
                />
                <div className="forgot-password">
                  <div className="checkbox-container">
                    <Checkbox />
                    <p>Remember me</p>
                  </div>
                  <p
                    className="forgot-pass-text"
                    onClick={() => setOpenFgtModal(true)}
                  >
                    Forgot password?
                  </p>
                </div>
                <CustomButton
                  loading={isLoading}
                  type="submit"
                  className="sign-in-btn"
                >
                  SIGN IN
                </CustomButton>
              </Form>
            )}
          </Formik>
        </CustomFormWrap>
        <ForgotPasswordModal
          open={openFgtModal}
          handleClose={() => setOpenFgtModal(false)}
        />
      </div>
    </>
  );
};

export default Login;
