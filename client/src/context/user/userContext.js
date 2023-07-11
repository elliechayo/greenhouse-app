import React, { createContext, useReducer } from "react";

// reducer
import userReducer from "./userReducer";
import jwtDecode from "jwt-decode";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../graphql/queries";

const UserContext = createContext();

const getAuthToken = () => {
  const token =
    document.cookie &&
    document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      .split("=")[1];

  return token;
};

export const UserProvider = ({ children }) => {
  const token = getAuthToken();
  let decodedToken;
  if (token) {
    decodedToken = jwtDecode(token);
  }
  const { data } = useQuery(GET_USER, {
    variables: { userId: decodedToken?.userId },
  });

  const initialState = {
    user: (data && data.user) || {},
  };
  const [state, dispatch] = useReducer(userReducer, initialState);
  console.log({ state });
  return (
    <UserContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
