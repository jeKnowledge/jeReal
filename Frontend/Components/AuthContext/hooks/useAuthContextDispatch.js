import * as React from "react";
import { AuthDispatchContext } from "expo/AppEntry";

const useAuthDispatch = () => {
  const dispatch = React.useContext(AuthDispatchContext);

  if (!dispatch)
    throw Error("useAuthDispatch must be used within AuthStateContext");

  const login = (token) => {
    dispatch({ type: "login", token });
  };

  const logout = () => {
    dispatch({ type: "logout" });
  };

  return { login, logout };
};

export default useAuthDispatch;