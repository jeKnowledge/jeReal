import React, {useContext } from "react";
import { AuthStateContext } from "..";

const useAuthState = () => {
  const state = useContext(AuthStateContext);
  console.log("state", state);
  if (!state) throw Error("useAuthState must be used within AuthStateContext");

  const {
    data: { token },
    error,
    status,
  } = state;

  return { token, isLoading: status === "pending" };
};

export default useAuthState;