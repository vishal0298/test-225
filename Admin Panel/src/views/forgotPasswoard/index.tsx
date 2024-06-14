import React, { useEffect } from "react";
import forgotImg from "assets/images/forgotpassword.png";
import { type GetOtpForm } from "utils/types/user.type";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useGetOtp } from "utils/api/auth.api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Input } from "components/input";
export default function ForgotPassword() {
  const navigate = useNavigate();

  const { mutate: verifyEmail, isSuccess, isLoading } = useGetOtp();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<GetOtpForm>();

  const onSubmit: SubmitHandler<GetOtpForm> = (data) =>
    verifyEmail(data?.email);

  useEffect(() => {
    if (isSuccess) {
      navigate("/verify-email", {
        state: { email: getValues("email"), isForgot: true },
      });
      toast.success("Email sent successfully!");
    }
  }, [isSuccess]);

  return (
    <section className="login-section">
      <div className="grid lg:grid-cols-12 h-screen gap-3">
        <div className="lg:col-span-6 relative lg:overflow-hidden">
          <div className="login-bg h-full flex items-center justify-center">
            <img
              className="max-w-xs lg:max-w-none object-contain"
              src={forgotImg}
              alt="title"
            />
          </div>
        </div>
        <div className="lg:col-span-6 flex items-center justify-center">
          <div className="login-wrapper w-full max-w-md mx-auto p-6">
            <h5 className="text-center text-black-800 text-3xl font-bold mb-8 xl:mb-16">
              Forgot password?
            </h5>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises  */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 xl:mb-20">
                <Input
                  isInvalid={Boolean(errors?.email)}
                  errorMessage={errors?.email?.message}
                  label="Email"
                  type="email"
                  name="email"
                  register={register}
                  rules={{
                    required: "Email is required",
                  }}
                />
              </div>
              <div className="lg:mx-8">
                <button
                  type="submit"
                  className="bg-cyan-800 hover:bg-cyan-300 text-black-800 text-xl font-medium border border-cyan-800 rounded-lg w-full p-3.5 transition"
                  disabled={isLoading}
                >
                  {isLoading ? (
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
