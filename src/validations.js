import * as Yup from "yup";

export const registrationFormSchema = Yup.object().shape({
    fullName: Yup.string().required("This is a * required field"),
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("This is a * required field"),
    mobile: Yup.string().required("This is a * required field"),
    dob: Yup.string().required("This is a * required field"),
    captcha: Yup.string().required("This is a * required field"),
  });

export const otpFormSchema = Yup.object().shape({
    otpId: Yup.string()
      .matches(/^\d+$/, "Invalid OTP")
      .required("This is a * required field")
      .min(6, "Enter a valid OTP")
      .max(6, "Enter a valid OTP"),
  });

export const passwordFormSchema = Yup.object().shape({
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

  export const loginValidationSchema = Yup.object().shape({
    username: Yup.string().required("This is a * required field"),
    password: Yup.string().required("This is a * required field"),
  });

  export const ValidateForgotPassForm = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("This is a * required field"),
  });
