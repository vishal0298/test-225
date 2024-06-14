import { Input } from "components/input";
import Layout from "layout";
import React, { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useVerifyEmail } from "utils/api/auth.api";
import { useUpdateEmail } from "utils/api/user.api";
import { limit } from "utils/helper";
import { type UpdateUserEmail } from "utils/types/user.type";

export default function ChangeEmailAddress() {
  const {
    mutate: updateEmail,
    isSuccess,
    isLoading,
    reset: resetEmail,
  } = useUpdateEmail();

  const { mutate: verifyEmail, isSuccess: verifySuccess } = useVerifyEmail();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset: resetForm,
  } = useForm<UpdateUserEmail>();

  const onSubmit: SubmitHandler<UpdateUserEmail> = (data) =>
    isSuccess
      ? verifyEmail({ email: data?.email, otp: data?.otp })
      : updateEmail(data);

  useEffect(() => {
    if (verifySuccess) {
      resetForm();
      resetEmail();
      toast.success("Email updated successfully!");
    }
  }, [verifySuccess]);

  const newEmail = watch("email");

  return (
    <Layout>
      <div className="dashboard-main">
        <div className="main-wrapper max-w-5xl p-6">
          <ul className="flex flex-wrap items-center gap-3 my-5">
            <li>
              <p className="text-black-900 text-xl">
                Change your email address
              </p>
            </li>
          </ul>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises  */}
          <form className="max-w-sm" onSubmit={handleSubmit(onSubmit)}>
            {isSuccess ? (
              <div className="mb-4">
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
                    className:
                      "w-full bg-black-300 border border-black-300 px-4 py-2.5 rounded focus:outline-0",
                  }}
                />
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <Input
                    type="email"
                    label="Enter your old email address"
                    register={register}
                    errorMessage={errors?.oldEmail?.message}
                    isInvalid={Boolean(errors?.oldEmail)}
                    name="oldEmail"
                    rules={{
                      required: "Old email is required",
                    }}
                    inputProps={{
                      className:
                        "w-full bg-black-300 border border-black-300 px-4 py-2.5 rounded focus:outline-0",
                    }}
                  />
                </div>
                <div className="mb-4">
                  <Input
                    type="email"
                    label="Enter your new email address"
                    register={register}
                    errorMessage={errors?.email?.message}
                    isInvalid={Boolean(errors?.email)}
                    name="email"
                    rules={{
                      required: "New email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter valid email.",
                      },
                    }}
                    inputProps={{
                      className:
                        "w-full bg-black-300 border border-black-300 px-4 py-2.5 rounded focus:outline-0",
                    }}
                  />
                </div>

                <div className="mb-4">
                  <Input
                    type="email"
                    label="Confirm your new email address"
                    register={register}
                    errorMessage={errors?.confirmEmail?.message}
                    isInvalid={Boolean(errors?.confirmEmail)}
                    name="confirmEmail"
                    rules={{
                      required: "Confirm new email is required",
                      validate: {
                        isMatch: (value) =>
                          value === newEmail || "Email does not match",
                      },
                    }}
                    inputProps={{
                      className:
                        "w-full bg-black-300 border border-black-300 px-4 py-2.5 rounded focus:outline-0",
                    }}
                  />
                </div>

                <div className="mb-4">
                  <Input
                    type="password"
                    label="Enter your password"
                    register={register}
                    errorMessage={errors?.password?.message}
                    isInvalid={Boolean(errors?.password)}
                    name="password"
                    rules={{
                      required: "Password is required",
                    }}
                    inputProps={{
                      className:
                        "w-full bg-black-300 border border-black-300 px-4 py-2.5 rounded focus:outline-0",
                    }}
                  />
                </div>
              </>
            )}
            <div className="flex items-center justify-end gap-5">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  resetEmail();
                }}
                className="text-black-800 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-cyan-800 hover:bg-cyan-300 text-black-800 text-xs font-medium border border-cyan-800 rounded-lg px-8 py-2.5 transition"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div
                    className="w-5 h-5 rounded-full animate-spin mx-auto
                  border-2 border-solid border-cyan-800 border-t-transparent"
                  ></div>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
