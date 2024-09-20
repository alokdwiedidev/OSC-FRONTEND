import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { apiClient } from "../../../api/apiClient";
import { URLS } from "../../../constants";
import { getErrorsBasedOnCode } from "../../../Pages/SignUp";
import TextInput from "../../TextInput";
import CustomButton from "../../CustomButton";
import { handleAlerts } from "../../../utils/helpers";

const PasswordForm = (props) => {
const {searchParams, isLoading, handleLoading, userData} = props
//   const [searchParams, setSearchParams] = useSearchParams();
//   const { isLoading, handleLoading } = useLoader();
  const navigate = useNavigate();
  const isForgotPassFlow = searchParams.get("fgtPass");

  const passwordFormSchema = Yup.object().shape({
    password: Yup.string()
      .required("This is a * required field")
      .matches("^(?=.*[&#$!@])[a-zA-Z0-9&#$!@]+$", "Password is weak")
      .min(8, "Password should have atleast 8 characters")
      .max(16, "Password cannot be greater than 16 characters"),
    confirmPassword: Yup.string()
      .test(
        "compareValues",
        "Password does not match",
        function (confirmPassword) {
          const password = this.parent.password;
          if (confirmPassword !== password) {
            return false;
          }
          return true;
        }
      )
      .required("This is a * required field"),
  });

  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword: "",
      }}
      onSubmit={async (values, { resetForm }) => {
        handleLoading(true);
        if (isForgotPassFlow) {
          const changePassPayload = {
            email: userData.emailId,
            password: values.password,
          };
          const response = await apiClient.post(
            URLS.CHANGE_PASSOWRD,
            changePassPayload
          );
          if (response.code === 200) {
            handleLoading(false);
            return navigate("/");
          } else {
            handleLoading(false);
            return handleAlerts("Error!", "OTP not saved", "error");
          }
        }
        const payload = {
          userId: userData.userId,
          password: values.password,
        };
        const response = await apiClient.post(URLS.ADD_PASSWORD, payload);
        if (response.code === 200) {
          handleLoading(false);
          resetForm();
          navigate("/");
        } else {
          handleLoading(false);
          handleAlerts("Error!", getErrorsBasedOnCode(response.code), "error");
        }
      }}
      validationSchema={passwordFormSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <Form className="password-form" onSubmit={handleSubmit}>
          <div>
            <p>In order to protect your account, make sure your password:</p>
            <ul>
              <li>Should be 8-16 characters long.</li>
              <li>
                Must be alphanumeric and must contain at least one special
                character such as '&@!#$'.
              </li>
            </ul>
          </div>
          <TextInput
            type="password"
            name="password"
            value={values.password || ""}
            placeHolder="Password"
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password && touched.password ? errors.password : ""}
          />
          <TextInput
            type="password"
            name="confirmPassword"
            value={values.confirmPassword || ""}
            placeHolder="Re-enter Password"
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              errors.confirmPassword && touched.confirmPassword
                ? errors.confirmPassword
                : ""
            }
          />
          <CustomButton loading={isLoading} type="submit" className="submit-btn">
            Submit
          </CustomButton>
        </Form>
      )}
    </Formik>
  );
};

export default PasswordForm;
