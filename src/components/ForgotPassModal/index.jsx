import { Box, Modal } from "@mui/material";
import React from "react";
import "./ForgotPassModal.css";
import { Form, Formik } from "formik";
import TextInput from "../TextInput";
import { URLS } from "../../constants";
import { useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton";
import { apiClient } from "../../api/apiClient";
import { handleAlerts } from "../../utils/helpers";
import { ValidateForgotPassForm } from "../../validations";
import useLoader from "../../customHooks/useLoader";

function ForgotPasswordModal(props) {
  const { open, handleClose, ...rest } = props;
  const { isLoading, handleLoading } = useLoader();

  const navigate = useNavigate();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "none",
    borderRadius: 3,
    boxShadow: 24,
    padding: 5,
  };

  return (
    <div className="fgt-modal-root">
      <Modal open={open} onClose={handleClose} {...rest}>
        <Box sx={style} className="modal-container">
          <div className="modal-header">
            <p>Forgot Password</p>
          </div>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={ValidateForgotPassForm}
            onSubmit={async (values) => {
              handleLoading(true);
              const payload = {
                email: values.email,
              };
              const response = await apiClient.post(
                URLS.FORGOT_PASSWORD,
                payload
              );
              if (response.code === 200) {
                handleLoading(false);
                let userData = JSON.parse(localStorage.getItem("userData"));
                userData = {
                  ...userData,
                  emailId: values.email,
                };
                localStorage.setItem("userData", JSON.stringify(userData));
                navigate("/sign-up?step=2&fgtPass=true");
                handleClose();
              } else {
                handleLoading(false);
                handleAlerts("Error!", "INVALID EMAIL", "error");
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit}>
                <p className="modal-text">
                  Enter the Email ID associated with your account and we'll send
                  you a link to reset your password.
                </p>
                <TextInput
                  name="email"
                  error={errors?.email && touched?.email ? errors.email : ""}
                  placeholder="Email ID"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <CustomButton
                  loading={isLoading}
                  type="submit"
                  className="continue-btn"
                >
                  Continue
                </CustomButton>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}

export default ForgotPasswordModal;
