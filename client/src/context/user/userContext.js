import { createContext, useReducer } from "react";
import userReducer from "./userReducer";
import jwtDecode from "jwt-decode";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../graphql/queries";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // get the token from Local Storage
  const token = localStorage.getItem("greenhouseUserToken") || "";
  let decoded = "invalidtoken";
  // decode the token
  if (token) {
    try {
      decoded = jwtDecode(token);
    } catch (error) {
      console.error(error);
    }
  }

  const { data } = useQuery(GET_USER, {
    variables: { id: decoded?.id },
  });

  const initialState = { user: {} };
  const [state, dispatch] = useReducer(userReducer, initialState);

  if (data && !state?.user?.id) {
    dispatch({
      type: "SET_USER",
      payload: { user: data.user },
    });
  }

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
