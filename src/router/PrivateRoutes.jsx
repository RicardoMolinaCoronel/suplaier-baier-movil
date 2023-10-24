/* eslint-disable no-constant-condition */
import { Navigate } from "react-router-native";

const PrivateRoutes = ({ children }) => {
  return true ? children : <Navigate to="/login" />;
};

export default PrivateRoutes;
