import { useEffect } from "react";
import { Navigate } from "react-router-native";

const PublicRoutes = ({children}) => {

  const tipoPage = (tipo) => {
    switch (tipo) {
      case "comprador":
        return "/comprador/home";
      case "proveedor":
        return "/proveedor/home";
    }
  }

  return (
    true
    ? children
    : <Navigate to={tipoPage("proveedor")}/>
  )
}

export default PublicRoutes
