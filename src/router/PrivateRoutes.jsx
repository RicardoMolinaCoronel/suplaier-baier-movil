/* eslint-disable no-constant-condition */
import { Navigate } from "react-router-native";
import { AuthContext } from "../auth/context/AuthContext";
import { useContext } from "react";
const PrivateRoutes = ({ children }) => {
  const { authState } = useContext(AuthContext);

  return authState.logged ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;
