import { useReducer } from "react";
import { types } from "../types/types";
import { AuthContext } from "./AuthContext";
import { authReducer } from "./authReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
const init = async () => {
  let user;
  try {
    user = await AsyncStorage.getItem("user");
  } catch (error) {
    console.log(error.message);
  }
  return {
    logged: false,
    user: JSON.parse({}),
  };
};

// aqui tambien deberia haber contexto para las ofertasActivas del usuario

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {}, init);
  const login = (user) => {
    const action = {
      type: types.login,
      payload: user,
    };
    dispatch(action);
  };

  const logout = () => {
    const action = {
      type: types.logout,
    };
    dispatch(action);
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
