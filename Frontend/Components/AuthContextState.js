import React from "react";
import { AuthStateContext } from "../";

const useAuthState = () => {
  const state = React.useContext(AuthStateContext);

  if (!state) throw Error("useAuthState must be used within AuthStateContext");

  const {
    data: { token },
    error,
    status,
  } = state;

  return { token, isLoading: status === "pending" };
};

export default useAuthState;