import { Navigate } from "react-router-native";
import { useContext } from "react";
import { AuthContext } from "../auth/context/AuthContext";

const PublicRoutes = ({ children }) => {
  const { authState } = useContext(AuthContext);

  return !authState.logged ? children : <Navigate to="/splash" />;
};

export default PublicRoutes;
