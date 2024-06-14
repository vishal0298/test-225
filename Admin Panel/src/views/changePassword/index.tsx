import React, { useEffect } from "react";
import { Input } from "components/input";
import Layout from "layout";
import { useUpdatePassword } from "utils/api/user.api";
import { type UpdateUserPassword } from "utils/types/user.type";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ChangePassword() {
  const { mutate: updatePassword, isSuccess, isLoading } = useUpdatePassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset: resetForm,
  } = useForm<UpdateUserPassword>();

  const onSubmit: SubmitHandler<UpdateUserPassword> = (data) =>
    updatePassword(data);

  useEffect(() => {
    if (isSuccess) {
      resetForm();
      toast.success("Password updated successfully!");
    }
  }, [isSuccess]);

  const newPassword = watch("password");
  return (
    <Layout>
      <div className="dashboard-main">
        <div className="main-wrapper max-w-5xl p-6">
          <ul className="flex flex-wrap items-center gap-3 my-5">
            <li>
              <p className="text-black-900 text-xl">Change your password</p>
            </li>
          </ul>
          {/*  eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form className="max-w-sm" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <Input
                type="password"
                label="Enter your old password"
                register={register}
                errorMessage={errors?.oldPassword?.message}
                isInvalid={Boolean(errors?.oldPassword)}
                name="oldPassword"
                rules={{
                  required: "Old Password is required",
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
                label="Enter your new password"
                register={register}
                errorMessage={errors?.password?.message}
                isInvalid={Boolean(errors?.password)}
                name="password"
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
                inputProps={{
                  className:
                    "w-full bg-black-300 border border-black-300 px-4 py-2.5 rounded focus:outline-0",
                }}
              />
            </div>

            <div className="mb-4">
              <Input
                type="password"
                label="Confirm your new password"
                register={register}
                errorMessage={errors?.confirmPassword?.message}
                isInvalid={Boolean(errors?.confirmPassword)}
                name="confirmPassword"
                rules={{
                  required: "Confirm password is required",
                  validate: {
                    isCharacter: (value) =>
                      value === newPassword ||
                      "Confirm password does not match",
                  },
                }}
                inputProps={{
                  className:
                    "w-full bg-black-300 border border-black-300 px-4 py-2.5 rounded focus:outline-0",
                }}
              />
            </div>

            <div className="flex items-center justify-end gap-5">
              <button
                type="button"
                onClick={() => resetForm()}
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
