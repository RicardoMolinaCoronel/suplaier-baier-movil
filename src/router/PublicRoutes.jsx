import { Navigate } from "react-router-native";
import { useContext } from "react";
import { AuthContext } from "../auth/context/AuthContext";
import { useNavigate } from "react-router-native";
const PublicRoutes = ({ children }) => {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);
  const tipoPage = (tipo) => {
    switch (tipo) {
      case "comprador":
        return "/comprador/home";
      case "proveedor":
        return "/proveedor/home";
    }
  };

  return !authState.logged ? children : <Navigate to={"/splash"} />;
};

export default PublicRoutes;
