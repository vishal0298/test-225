import React, { useEffect } from "react";
import signupImg from "assets/images/signup-img.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useSignUp } from "utils/api/auth.api";
import { type Register } from "utils/types/user.type";
import { Input } from "components/input";
import toast from "react-hot-toast";

export default function Signup() {
  const navigate = useNavigate();
  const { mutate: signup, isLoading, isSuccess, data } = useSignUp();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Register>();
  const onSubmit: SubmitHandler<Register> = (data) => signup(data);

  const userPassword = watch("password");

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully signup!");
      navigate("/verify-email", { state: { email: data?.user?.email } });
    }
  }, [isSuccess]);

  return (
    <section className="signup-section">
      <div className="grid lg:grid-cols-12 h-screen gap-3">
        <div className="lg:col-span-6 relative lg:overflow-hidden">
          <div className="signup-bg h-full flex items-center justify-center">
            <img
              className="max-w-xs lg:max-w-none object-cover object-right-top"
              src={signupImg}
              alt="title"
            />
          </div>
        </div>
        <div className="lg:col-span-6 flex items-center justify-center">
          <div className="signup-wrapper w-full max-w-md mx-auto p-6">
            <h5 className="text-center text-black-800 text-3xl font-bold mb-6 xl:mb-10">
              Create an account
            </h5>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises  */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <Input
                  isInvalid={Boolean(errors?.firstName)}
                  errorMessage={errors?.firstName?.message}
                  label="First Name"
                  type="text"
                  name="firstName"
                  register={register}
                  rules={{
                    required: "First name is required",
                  }}
                />
              </div>

              <div className="mb-4">
                <Input
                  isInvalid={Boolean(errors?.lastName)}
                  errorMessage={errors?.lastName?.message}
                  label="Last Name"
                  type="text"
                  name="lastName"
                  register={register}
                  rules={{
                    required: "Last name is required",
                  }}
                />
              </div>

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
              <div className="mb-4 lg:mb-14">
                <div className="flex mb-2">
                  <input
                    className="mr-2 mt-1 "
                    type="checkbox"
                    {...register("isAgree", {
                      required: "Agree to terms & conditions",
                    })}
                  />
                  <label htmlFor="check-1">
                    I agree to all the{" "}
                    <a href="#" className="text-xs leading-relaxed font-bold">
                      Terms & Conditions
                    </a>
                  </label>
                </div>
                {Boolean(errors?.isAgree) && (
                  <span className="text-red-800">
                    {errors?.isAgree?.message}
                  </span>
                )}
              </div>

              <div className="lg:mx-8">
                <button
                  type="submit"
                  className="bg-cyan-800 hover:bg-cyan-300 disabled:bg-cyan-300 text-black-800 text-base font-medium border border-cyan-800 rounded-lg w-full p-3 transition"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div
                      className="w-8 h-8 rounded-full animate-spin mx-auto
                    border-4 border-solid border-cyan-800 border-t-transparent"
                    ></div>
                  ) : (
                    "Create an account"
                  )}
                </button>
                <Link
                  to="/login"
                  className="mt-8 bg-cyan-300 block text-center text-black-800 text-base font-medium border border-cyan-300 hover:border-cyan-800 rounded-lg w-full p-3"
                >
                  Login instead
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
