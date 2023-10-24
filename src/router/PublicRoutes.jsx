import { Navigate } from "react-router-native";

const PublicRoutes = ({ children }) => {
  const tipoPage = (tipo) => {
    switch (tipo) {
      case "comprador":
        return "/comprador/home";
      case "proveedor":
        return "/proveedor/home";
    }
  };

  return (
    // eslint-disable-next-line no-constant-condition
    true ? children : <Navigate to={tipoPage("proveedor")} />
  );
};

export default PublicRoutes;
