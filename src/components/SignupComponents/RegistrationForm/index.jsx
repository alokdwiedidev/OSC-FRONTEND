import React, { useEffect } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { apiClient } from "../../../api/apiClient";
import { URLS } from "../../../constants";
import { getErrorsBasedOnCode } from "../../../Pages/SignUp";
import TextInput from "../../TextInput";
import CustomButton from "../../CustomButton";
import { handleAlerts } from "../../../utils/helpers";

function RegistrationForm(props) {
  const {searchParams, setSearchParams, isLoading, handleLoading} = props

  useEffect(() => {
    if (searchParams.get("step") === "1") {
      loadCaptchaEnginge(6);
    }
  }, [searchParams]);

  const registrationFormSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("This is a * required field")
      .matches(/^[a-zA-Z\s]+$/, "Only letters are allowed in this field."),
    email: Yup.string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please enter a valid email address"
      )
      .required("This is a * required field"),
    mobile: Yup.string().required("This is a * required field"),
    dob: Yup.string().required("This is a * required field"),
    captcha: Yup.string().required("This is a * required field"),
  });

  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        mobile: "",
        dob: "",
        captcha: "",
        otpId: null,
        password: "",
        confirmPassword: "",
      }}
      onSubmit={async (values, { resetForm }) => {
        const payload = {
          name: values.fullName,
          email: values.email,
          contact: values.mobile,
          DOB: values.dob,
        };
        if (!validateCaptcha(values?.captcha)) {
          handleAlerts(
            "Invalid captcha",
            "Please enter a valid captcha",
            "error"
          );
          return (values.captcha = "");
        }
        handleLoading(true);
        const response = await apiClient.post(URLS.SIGN_UP, payload);
        if (response?.code === 200) {
          handleLoading(false);
          const userData = {
            userId: response.dataObject.userId,
            emailId: values.email,
          };
          localStorage.setItem("userData", JSON.stringify(userData));
          resetForm();
          return setSearchParams({ step: 2 });
        } else {
          handleLoading(false);
          handleAlerts("Error!", getErrorsBasedOnCode(response.code), "error");
        }
      }}
      validationSchema={registrationFormSchema}
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
          <TextInput
            type="text"
            name="fullName"
            value={values.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeHolder="Full Name"
            error={errors.fullName && touched.fullName ? errors.fullName : null}
          />
          <TextInput
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeHolder="Email ID"
            error={errors.email ? errors.email : null}
          />
          <div className="adjacent-field-container">
            <TextInput
              type="text"
              name="mobile"
              value={values.mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              placeHolder="Mobile No."
              error={errors.mobile ? errors.mobile : null}
            />
            <TextInput
              type="date"
              name="dob"
              value={values.dob}
              onChange={handleChange}
              onBlur={handleBlur}
              placeHolder="Date of Birth"
              error={errors.dob ? errors.dob : null}
            />
          </div>
          {/* {currentStep === "1" ? ( */}
          <div className="captcha-container">
            <div className="captcha">
              <LoadCanvasTemplate reloadText={"⟳"} reloadColor={"#000"} />
            </div>
            <TextInput
              type="text"
              name="captcha"
              value={values.captcha}
              onChange={handleChange}
              onBlur={handleBlur}
              placeHolder={"Enter Captcha"}
              className={"captcha-input"}
              error={errors.captcha ? errors.captcha : null}
            />
          </div>
          {/* ) : null} */}
          <CustomButton
            loading={isLoading}
            type="submit"
            className="submit-btn"
          >
            SUBMIT
          </CustomButton>
        </Form>
      )}
    </Formik>
  );
}

export default RegistrationForm;
