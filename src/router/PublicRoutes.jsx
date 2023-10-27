import { Navigate } from "react-router-native";
import { useContext } from "react";
import { AuthContext } from "../auth/context/AuthContext";
const PublicRoutes = ({ children }) => {
  const { authState } = useContext(AuthContext);
  const tipoPage = (tipo) => {
    switch (tipo) {
      case "comprador":
        return "/comprador/home";
      case "proveedor":
        return "/proveedor/home";
    }
  };

  return !authState.logged ? (
    children
  ) : (
    <Navigate to={tipoPage(authState?.user?.Rol)} />
  );
};

export default PublicRoutes;
