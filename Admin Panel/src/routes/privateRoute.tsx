/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({
  component,
}: {
  component: JSX.Element;
}) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" />;
  return component;
}
