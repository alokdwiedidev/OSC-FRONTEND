import React from "react";
import CustomFormWrap from "../../components/CustomFormWrap";
import "./SignUp.css";
import wavebg from "../../assets/imageedit_2_3611863364.png";
import { useNavigate, useSearchParams } from "react-router-dom";
import BaseHeader from "../../components/BaseHeader";
import RegistrationForm from "../../components/SignupComponents/RegistrationForm";
import useLoader from "../../customHooks/useLoader";
import OtpForm from "../../components/SignupComponents/OtpForm";
import PasswordForm from "../../components/SignupComponents/PasswordForm";

export const getErrorsBasedOnCode = (errorCode) => {
  switch (errorCode) {
    case 30:
      return "EMAIL ALREADY IN USE";
    case 220:
      return "EMAIL NOT SENT";
    case 1999:
      return "USER-ID DOES NOT EXIST";
    case 502:
      return "INVALID OTP";
    case 301:
      return "YOU HAVE EXCEEDED THE MAXIMUM NUMBER OF ATTEMPTS FOR ENTERING THE OTP";
    default: {
      return "SOMETHING WENT WRONG";
    }
  }
};

const SignUp = (props) => {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading, handleLoading } = useLoader();

  const currentStep = searchParams.get("step");

  return (
    <>
      <BaseHeader />
      <div
        style={{ backgroundImage: `url(${wavebg})` }}
        className="signup-root"
      >
        <CustomFormWrap
          flip
          panelTitle="Welcome Back!"
          panelDescription="Please login to start shopping with us."
          pannelbuttonLabel="LOGIN"
          onClickPanelButton={() => navigate("/")}
        >
          <div className="signup-container">
            <h1>
              {searchParams.get("fgtPass")
                ? "RESET PASSWORD"
                : "CREATE ACCOUNT"}
            </h1>
            {currentStep === "1" ? (
              <RegistrationForm
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                isLoading={isLoading}
                handleLoading={handleLoading}
              />
            ) : currentStep === "2" ? (
              <OtpForm
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                isLoading={isLoading}
                handleLoading={handleLoading}
                userData={userData}
              />
            ) : (
              <PasswordForm
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                isLoading={isLoading}
                handleLoading={handleLoading}
                userData={userData}
              />
            )}
          </div>
        </CustomFormWrap>
      </div>
    </>
  );
};

export default SignUp;
