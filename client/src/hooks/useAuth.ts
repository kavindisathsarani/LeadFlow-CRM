import { useMemo } from "react";

export const useAuth = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  return useMemo(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      user: user ? JSON.parse(user) : null,
    }),
    [token, user]
  );
};
