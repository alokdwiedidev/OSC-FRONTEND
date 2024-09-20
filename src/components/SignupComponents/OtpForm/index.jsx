import React, { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { apiClient } from "../../../api/apiClient";
import { URLS } from "../../../constants";
import { getErrorsBasedOnCode } from "../../../Pages/SignUp";
import TextInput from "../../TextInput";
import CustomButton from "../../CustomButton";
import { handleAlerts, handleHideEmail } from "../../../utils/helpers";
import {useNavigate} from "react-router-dom";

const OtpForm = (props) => {
  const {searchParams, setSearchParams, isLoading, handleLoading, userData} = props
  const [resentOtp, setResendOtp] = useState(false);
  const isForgotPassFlow = searchParams.get("fgtPass");
  const navigate = useNavigate()

  const otpFormSchema = Yup.object().shape({
    otpId: Yup.string()
      .matches(/^\d+$/, "Invalid OTP")
      .required("This is a * required field")
      .min(6, "Enter a valid OTP")
      .max(6, "Enter a valid OTP"),
  });

  return (
    <Formik
      initialValues={{
        otpId: null,
      }}
      onSubmit={async (values, { resetForm }) => {
        handleLoading(true);
        // @toDo API integration
        if (resentOtp) {
          console.log("HERE")
          const payload = {
            userId: userData.userId,
          };
          const response = await apiClient.post(URLS.RESEND_OTP, payload);
          if (response.code === 200) {
            handleLoading(false);
            setResendOtp(false);
            return handleAlerts("Success", "", "success");
          } else {
            return handleAlerts("Error", "SOMETHING WENT WRONG", "error");
          }
        }
        if (isForgotPassFlow) {
          const fgtPasswordPayload = {
            email: userData.emailId,
            OTP: values.otpId.toString(),
          };
          const response = await apiClient.post(
            URLS.OTP_FORGOT_PASS,
            fgtPasswordPayload
          );
          if (response.code === 200) {
            handleLoading(false);
            resetForm();
            return setSearchParams({ step: 3, fgtPass: true });
          } else {
            handleLoading(false);
            return handleAlerts("Error!", "INVALID OTP", "error");
          }
        }
        const payload = {
          userId: userData.userId,
          OTP: values.otpId,
        };
        const response = await apiClient.post(URLS.VERIFY_OTP, payload);
        if (response.code === 500) {
          handleLoading(false);
          resetForm();
          return setSearchParams({ step: 3 });
        } else {
          handleLoading(false);
          handleAlerts(
            "Error!",
            getErrorsBasedOnCode(response.code),
            "error",
            async (result) => {
              if (result.isConfirmed && response.code === 301) {
                // setResendOtp(true);
                navigate("/sign-up?step=1")
              }
            }
          );
        }
      }}
      validationSchema={otpFormSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Form className="otp-form" onSubmit={handleSubmit}>
          <p>
            Enter the verification code sent on your registered Email ID:
            {` ${handleHideEmail(userData.emailId) || ""}`}
          </p>
          <TextInput
            type="number"
            name="otpId"
            value={values.otpId || ""}
            onChange={handleChange}
            placeHolder="Verification Code"
            onBlur={handleBlur}
            error={errors.otpId && touched.otpId ? errors.otpId : ""}
          />
          <CustomButton
            loading={isLoading}
            type="submit"
            className="submit-btn"
          >
            {resentOtp ? "Resend OTP" : "Proceed"}
          </CustomButton>
        </Form>
      )}
    </Formik>
  );
};

export default OtpForm;
