import React, {useContext } from "react";
import { AuthStateContext } from "expo/AppEntry";

const useAuthState = () => {
  const state = useContext(AuthStateContext);

  if (!state) throw Error("useAuthState must be used within AuthStateContext");

  const {
    data: { token },
    error,
    status,
  } = state;

  return { token, isLoading: status === "pending" };
};

export default useAuthState;