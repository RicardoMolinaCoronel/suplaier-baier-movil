import { React, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-native";
import StyledText from "../styles/StyledText.jsx";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { AuthContext } from "../auth/context/AuthContext.jsx";
import PrivateRoutes from "./PrivateRoutes.jsx";
import PublicRoutes from "./PublicRoutes.jsx";
import MainProveedor from "../proveedores/routes/MainProveedor.jsx";
import LoginPage from "../auth/pages/LoginPage.jsx";
import TipoRegistroPage from "../auth/pages/TipoRegistroPage.jsx";
const AppRouter = () => {
  const { authState } = useContext(AuthContext);

  const getRoutesByTypeOfUser = (tipo) => {
    switch (tipo) {
      case "comprador":
        return (
          <View>
            <StyledText fontWeight="bold"> COMPRADOR</StyledText>
            <StatusBar style="light" />
          </View>
        );
      case "proveedor":
        return <MainProveedor />;
    }
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <LoginPage />
            </PublicRoutes>
          }
        />
        <Route
          path="/signup_type"
          element={
            <PublicRoutes>
              <TipoRegistroPage />
            </PublicRoutes>
          }
        />
        <Route
          path="/signup_comprador"
          element={
            <PublicRoutes>
              <View>
                <StyledText fontWeight="bold"> COMPRADOR</StyledText>
                <StatusBar style="light" />
                <Navigate to="/proveedor/search" />
              </View>
            </PublicRoutes>
          }
        />
        <Route
          path="/signup_proveedor"
          element={
            <PublicRoutes>
              <View>
                <StyledText fontWeight="bold"> COMPRADOR</StyledText>
                <StatusBar style="light" />
                <Navigate to="/proveedor/search" />
              </View>
            </PublicRoutes>
          }
        />
        <Route
          path="/terminos_y_condiciones"
          element={
            <PublicRoutes>
              <View>
                <StyledText fontWeight="bold"> COMPRADOR</StyledText>
                <StatusBar style="light" />
                <Navigate to="/proveedor/search" />
              </View>
            </PublicRoutes>
          }
        />
        <Route
          path="/sesion_expirada"
          element={
            <PublicRoutes>
              <View>
                <StyledText fontWeight="bold"> COMPRADOR</StyledText>
                <StatusBar style="light" />
                <Navigate to="/proveedor/search" />
              </View>
            </PublicRoutes>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoutes>
              {getRoutesByTypeOfUser(authState?.user?.Rol)}
            </PrivateRoutes>
          }
        />
      </Routes>
    </>
  );
};
export default AppRouter;
