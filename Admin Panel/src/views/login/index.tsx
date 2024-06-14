import React, { useEffect } from "react";
import welcomeBack from "assets/images/welcome-back.png";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "utils/api/auth.api";
import { type UserLogin } from "utils/types/user.type";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Input } from "components/input";

export default function Login() {
  const navigate = useNavigate();

  const { mutate: userLogin, isSuccess, data, isLoading } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>();

  const onSubmit: SubmitHandler<UserLogin> = (data) => userLogin(data);

  useEffect(() => {
    if (isSuccess) {
      if (data?.user?.isAdmin) {
        localStorage.setItem("token", data?.token?.access_token?.split(" ")[1]);
        localStorage.setItem("userRole", data?.user?.role);
        toast.success("Login successfully!");
        navigate("/pending-withdrawals");
      } else {
        toast.error("Only admins can login!");
      }
    }
  }, [isSuccess]);
  return (
    <section className="login-section">
      <div className="grid lg:grid-cols-12 h-screen gap-3">
        <div className="lg:col-span-6 relative lg:overflow-hidden">
          <div className="login-bg h-full flex items-center justify-center">
            <img
              className="max-w-xs lg:max-w-none object-cover object-right-top"
              src={welcomeBack}
              alt="title"
            />
          </div>
        </div>
        <div className="lg:col-span-6 flex items-center justify-center">
          <div className="login-wrapper w-full max-w-md mx-auto p-6">
            <h5 className="text-center text-black-800 text-3xl font-bold mb-8 xl:mb-16">
              Welcome back
            </h5>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises  */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
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
                  }}
                />
              </div>

              <div className="mb-4 lg:mb-14">
                <div className="text-right">
                  <Link to="/forgot-password">
                    <b>Forgot Password?</b>
                  </Link>
                </div>
              </div>

              <div className="lg:mx-8 mb-8">
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
                    "Login to your account"
                  )}
                </button>
              </div>
              <div className="text-center">
                <Link
                  to="/signup"
                  className="text-stone-700 text-xl font-light"
                >
                  Create an account instead?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
