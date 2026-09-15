import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCurrentUser } from "../../services/session";

export default function ProtectedRoute({
  children,
  allowedRoles = []
}) {

  const location = useLocation();
  const user = getCurrentUser();

  if (!user) {

    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname
        }}
      />
    );
  }

  const role =
    user.role?.toUpperCase();

  const allowed =
    allowedRoles.map(
      item => item.toUpperCase()
    );

  if (
    allowed.length > 0 &&
    !allowed.includes(role)
  ) {

    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  return children;
}
