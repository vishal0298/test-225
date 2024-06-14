import React, { useEffect } from "react";
import forgotImg from "assets/images/forgotpassword.png";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useResetPassword } from "utils/api/auth.api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Input } from "components/input";

interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}

export default function ResetPassword() {
  const navigate = useNavigate();

  const { mutate: resetPassword, isSuccess, isLoading } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordForm>();

  const onSubmit: SubmitHandler<ResetPasswordForm> = (data) =>
    resetPassword(data?.password);

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
      toast.success("Password reset successfully!");
    }
  }, [isSuccess]);

  const userPassword = watch("password");

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
              Reset password
            </h5>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises  */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <Input
                  isInvalid={Boolean(errors?.password)}
                  errorMessage={errors?.password?.message}
                  label="Password"
                  type="password"
                  name="password"
                  register={register}
                  rules={{
                    required: "Password is required",
                    validate: {
                      isCharacter: (value: string) =>
                        // eslint-disable-next-line
                        /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value) ||
                        "Must contain one Special character",
                      // eslint-disable-next-line
                      isSmall: (value: string) =>
                        /[a-z]/.test(value) || "Must contain one Small letter",
                      isCapital: (value: string) =>
                        /[A-Z]/.test(value) ||
                        "Must contain one Capital character",
                      isDigit: (value: string) =>
                        /\d/.test(value) || "Must contain one Digit character",
                    },
                    minLength: {
                      value: 8,
                      message: "Minimum length should be 8",
                    },
                  }}
                />
              </div>

              <div className="mb-4">
                <Input
                  isInvalid={Boolean(errors?.confirmPassword)}
                  errorMessage={errors?.confirmPassword?.message}
                  label="Re-enter password"
                  type="password"
                  name="confirmPassword"
                  register={register}
                  rules={{
                    required: "Re-enter Password",
                    validate: {
                      isMatch: (value: string) =>
                        userPassword === value || "Password did not match",
                    },
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
