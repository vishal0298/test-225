import React, { useEffect } from "react";
import verifyMail from "assets/images/verify-mail.png";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useVerifyEmail, useVerifyOtp } from "utils/api/auth.api";
import { type VerifyEmailForm } from "utils/types/user.type";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Input } from "components/input";
import { limit } from "utils/helper";
export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();

  const { mutate: verifyEmail, isSuccess, isLoading } = useVerifyEmail();
  const {
    mutate: verifyOtp,
    isSuccess: otpSuccess,
    data: otpData,
    isLoading: otpLoading,
  } = useVerifyOtp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailForm>();

  const onSubmit: SubmitHandler<VerifyEmailForm> = (data) => {
    if (location.state.isForgot) {
      verifyOtp({ otp: data?.otp, email: location.state.email });
    } else verifyEmail({ otp: data?.otp, email: location.state.email });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Email verified successfully!");
      toast.error("Now wait for admin approval!");
      navigate("/login");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (otpSuccess) {
      localStorage.setItem("otp_token", otpData?.token?.access_token);
      navigate("/reset-password");
      toast.success("OTP verified successfully!");
    }
  }, [otpSuccess]);

  return (
    <section className="login-section">
      <div className="grid lg:grid-cols-12 h-screen gap-3">
        <div className="lg:col-span-6 relative lg:overflow-hidden">
          <div className="login-bg h-full flex items-center justify-center">
            <img
              className="max-w-xs lg:max-w-none object-contain"
              src={verifyMail}
              alt="title"
            />
          </div>
        </div>
        <div className="lg:col-span-6 flex items-center justify-center">
          <div className="login-wrapper w-full max-w-md mx-auto p-6">
            <h5 className="text-center text-black-800 text-3xl font-bold mb-2">
              {location.state.isForgot ? "Verify OTP" : "Verify Email"}
            </h5>
            <p className="text-center text-black-600/80 text-base mb-8 xl:mb-16">
              {
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                `We have sent an email to your email ${location.state.email}`
              }
              <br />
              account with a verification code
            </p>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises  */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 xl:mb-20 text-center">
                <Input
                  isInvalid={Boolean(errors?.otp)}
                  errorMessage={errors?.otp?.message}
                  label="Verification code"
                  type="number"
                  register={register}
                  name="otp"
                  rules={{ required: "Code is required" }}
                  inputProps={{
                    onKeyDown: (e) => limit(e),
                    onKeyUp: (e) => limit(e),
                  }}
                />
              </div>
              <div className="lg:mx-8">
                <button
                  type="submit"
                  className="bg-cyan-800 hover:bg-cyan-300 text-black-800 text-xl font-medium border border-cyan-800 rounded-lg w-full p-3.5 transition"
                  disabled={isLoading || otpLoading}
                >
                  {isLoading || otpLoading ? (
                    <div
                      className="w-8 h-8 rounded-full animate-spin mx-auto
                      border-4 border-solid border-cyan-800 border-t-transparent"
                    ></div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
