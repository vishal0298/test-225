import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "./api-client";
import {
  type UserTransaction,
  type CoinType,
  type UserStats,
  type ListedUser,
  type User,
  type UpdateUserEmail,
  type UpdateUserPassword,
  type UserWalletDetail,
} from "utils/types/user.type";

export const useGetLoggedInUser = () =>
  useQuery<User, Error>(
    ["getLoggedInUser"],
    async () => await client(`auth/getLoggedInUser`)
  );

export const useGetTransactions = (
  status: "Completed" | "Pending" | "Rejected",
  type?: "Deposit" | "Swap" | "Withdraw" | "Withdraw Fiat"
) =>
  useQuery<UserTransaction[], Error>(
    ["getTransactions", status],
    async () =>
      await client(
        `wallet/getTransactionsByAdmin?status=${status}${
          type ? `&type=${type}` : ""
        }`
      )
  );

export const useGetStats = () =>
  useQuery<UserStats, Error>(
    ["getStats"],
    async () => await client(`wallet/getStats`)
  );

export const useGetFee = () =>
  useQuery<any, Error>(["getFee"], async () => await client(`wallet/getFee`));

export const useGetUserList = (isAdmin?: boolean) =>
  useQuery<ListedUser[], Error>(
    ["getUserList"],
    async () =>
      await client(`auth/getAllUsers${isAdmin ? "?filterOnlyAdmins=true" : ""}`)
  );

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, { userId: string; isActive: boolean }>(
    async (data) => await client(`auth/updateUserActive`, { data }),
    {
      onSuccess() {
        void queryClient.invalidateQueries(["getUserList"]);
      },
    }
  );
};

export const useGetCoins = () =>
  useQuery<CoinType[], Error>(
    ["getCoins"],
    async () => await client(`coins/getCoins`)
  );

export const useUpdateCoinPrice = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, { price: number; coinId: string }>(
    async (data) => await client(`coins/updatePrice`, { data }),
    {
      onSuccess() {
        void queryClient.invalidateQueries(["getCoins"]);
      },
    }
  );
};

export const useSetFee = () => {
  const queryClient = useQueryClient();
  return useMutation<
    unknown,
    Error,
    { feeName: string; feePercentage: number }
  >(async (data) => await client(`wallet/setFee`, { data }), {
    onSuccess() {
      void queryClient.invalidateQueries(["getFee"]);
    },
  });
};

export const useUpdateEmail = () =>
  useMutation<unknown, Error, UpdateUserEmail>(
    async (data) => await client(`auth/changeEmail`, { data })
  );

export const useUpdatePassword = () =>
  useMutation<unknown, Error, UpdateUserPassword>(
    async (data) => await client(`auth/changePassword`, { data })
  );

export const useUpdateAdmin = () => {
  const queryClient = useQueryClient();
  return useMutation<
    unknown,
    Error,
    { userId: string; role: "User" | "Admin" | string }
  >(async (data) => await client(`auth/updateUserRole`, { data }), {
    onSuccess() {
      void queryClient.invalidateQueries(["getUserList"]);
    },
  });
};

export const useGetUserWalletBalance = (id?: string) =>
  useQuery<UserWalletDetail, Error>(
    ["getUserWalletBalance", id],
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    async () => await client(`wallet/getUserWalletWithBalance/${id}`),
    { enabled: !!id }
  );

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, { transactionId: string; status: string }>(
    async (data) => await client(`wallet/updateTransaction`, { data }),
    {
      onSuccess() {
        void queryClient.invalidateQueries(["getTransactions", "Pending"]);
      },
    }
  );
};
