import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import PendingTransactions from "views/pendingTransactions";
import CompletedTransactions from "views/completedTransactions";
import AdminAccess from "views/adminAccess";
import ChangeEmailAddress from "views/changeEmail";
import ChangePassword from "views/changePassword";
import UserDictionary from "views/userDictionary";
import RateSettings from "views/rateSettings";
import Login from "views/login";
import Signup from "views/signup";
import ForgotPassword from "views/forgotPasswoard";
import VerifyEmail from "views/verifyEmail";
import ResetPassword from "views/resetPassword";
import Logout from "views/logout";

const routes = [
  {
    path: "/pending-withdrawals",
    Component: PendingTransactions,
    isPrivate: true,
  },
  {
    path: "/transaction-history",
    Component: CompletedTransactions,
    isPrivate: true,
  },
  {
    path: "/users",
    Component: UserDictionary,
    isPrivate: true,
  },
  {
    path: "/admin-management",
    Component: AdminAccess,
    isPrivate: true,
  },
  {
    path: "/change-email",
    Component: ChangeEmailAddress,
    isPrivate: true,
  },
  {
    path: "/change-password",
    Component: ChangePassword,
    isPrivate: true,
  },
  {
    path: "/earning-fee",
    Component: RateSettings,
    isPrivate: true,
  },
  {
    path: "/login",
    Component: Login,
    isPrivate: false,
  },
  {
    path: "/forgot-password",
    Component: ForgotPassword,
    isPrivate: false,
  },
  {
    path: "/reset-password",
    Component: ResetPassword,
    isPrivate: false,
  },
  {
    path: "/verify-email",
    Component: VerifyEmail,
    isPrivate: false,
  },
  {
    path: "/signup",
    Component: Signup,
    isPrivate: false,
  },
  {
    path: "/logout",
    Component: Logout,
    isPrivate: false,
  },
];

export default function AppRoutes() {
  return (
    <Routes>
      {routes?.map(({ path, Component, isPrivate }) => (
        <Route
          key={path}
          element={
            isPrivate ? (
              <PrivateRoute component={<Component />} />
            ) : (
              <Component />
            )
          }
          path={path}
        />
      ))}
      <Route path="*" element={<Navigate to="/pending-withdrawals" />} />
    </Routes>
  );
}
