import React, { useReducer, useEffect, createContext } from "react";
import axios from "axios";
import LoginScreen from "../Screens/LoginScreen";
import { AsyncStorageLib } from "@react-native-async-storage/async-storage";

let AuthDispatchContext = createContext(undefined);
AuthDispatchContext.displayName = "AuthDispatchContext";

let AuthStateContext = createContext();
AuthStateContext.displayName = "AuthStateContext";

const initialState = {
  data: { token: null },
  status: "idle",
  error: null,
};

// context reducer:
const reducer = (state, action) => {
  switch (action.type) {
    case "login": {
      return {
        ...state,
        status: "resolved",
        error: null,
        data: { ...state.data, token: action.token },
      };
    }

    case "logout": {
      return { ...initialState };
    }
    case "set data":
      return { ...state, data: action.data, status: "resolved", error: null };
    case "resolved":
      return { ...state, status: "resolved", error: null };
    case "rejected":
      return { ...state, status: "rejected", error: action.error };
    case "pending":
      return { ...state, status: "pending", error: null };
    default:
      return { ...state };
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function main() {
      dispatch({ type: "pending" });
      try {
        const token = await getTokenFromStorage();
        dispatch({ type: "set data", data: { token } });
      } catch (err) {
        console.log("err", err);
        dispatch({ type: "rejected", error: "Error" });
      }
    }
    main();
  }, []);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const storeToken = async (token) => {
  await AsyncStorageLib.setItem("token", token);
};

export const getTokenFromStorage = async () => {
  const token = await AsyncStorageLib.getItem("token");
  return token;
};

export { AuthContextProvider, AuthDispatchContext, AuthStateContext };
