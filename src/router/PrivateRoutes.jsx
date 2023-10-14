import { useContext } from "react";
import { Navigate } from "react-router-native";


const PrivateRoutes = ({children}) => {
  return (
    true
    ? children
    : <Navigate to="/login"/>
  )
}

export default PrivateRoutes