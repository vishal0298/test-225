import { useMutation } from "@tanstack/react-query";
import {
  type VerifyEmailForm,
  type User,
  type Register,
  type UserLogin,
} from "utils/types/user.type";
import { client } from "./api-client";

export const useLogin = () =>
  useMutation<
    { token: { access_token: string }; user: User },
    Error,
    UserLogin
  >(
    async (data) =>
      await client("auth/login", {
        data,
      })
  );

export const useSignUp = () =>
  useMutation<{ user: User }, Error, Register>(
    async (data) =>
      await client("auth/signupAdmin", {
        data,
      })
  );

export const useVerifyEmail = () =>
  useMutation<
    { user: User; token: { access_token: string } },
    Error,
    VerifyEmailForm
  >(
    async (data) =>
      await client(`auth/verifyEmail`, {
        data,
      })
  );

export const useGetOtp = () =>
  useMutation<unknown, Error, string>(
    async (email) =>
      await client(`auth/forgotPassword`, {
        data: { email },
      })
  );

export const useVerifyOtp = () =>
  useMutation<
    {
      token: {
        access_token: string;
      };
    },
    Error,
    VerifyEmailForm
  >(
    async (data) =>
      await client(`auth/verifyOtpForForgotPassword`, {
        data,
      })
  );

export const useReSendOtp = () =>
  useMutation<unknown, Error, string>(
    async (email) =>
      await client("auth/resendOtp", {
        data: { email },
      })
  );

export const useResetPassword = () =>
  useMutation<unknown, Error, string>(
    async (password) =>
      await client("auth/resetPassword", {
        data: { password },
        headers: {
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/prefer-nullish-coalescing
          Authorization: localStorage.getItem("otp_token") || "",
        },
      })
  );

export const useChangePassword = () =>
  useMutation<unknown, Error, string>(
    async (password) =>
      await client("user/changePassword", {
        data: { password },
      })
  );
