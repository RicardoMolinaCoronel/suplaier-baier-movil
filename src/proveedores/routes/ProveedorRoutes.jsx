import { React } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-native";
import { StatusBar } from "expo-status-bar";
import HomeRoutes from "./HomeRoutes";
import ProfileRoutes from "./ProfileRoutes";
import AppProvBar from "../components/AppProvBar";
import NavigationBar from "../components/NavigationBar";
import OrdenesRoutes from "./OrdenesRoutes";
const ProveedorRoutes = ({
  closeButtonOffset,
  scaleValue,
  offsetValue,
  showMenu,
  setShowMenu,
}) => {
  const location = useLocation();

  return (
    <Routes>
      <Route
        path="/proveedor/home/*"
        element={
          <>
            <AppProvBar
              closeButtonOffset={closeButtonOffset}
              scaleValue={scaleValue}
              offsetValue={offsetValue}
              showMenu={showMenu}
              setShowMenu={setShowMenu}
            />
            <StatusBar style="light" />

            <HomeRoutes />
            {location.pathname == "/proveedor/home" && (
              <Navigate to="/proveedor/home/ofertas" />
            )}
            <NavigationBar />
          </>
        }
      />
      <Route
        path="/proveedor/profile/*"
        element={
          <>
            <AppProvBar
              closeButtonOffset={closeButtonOffset}
              scaleValue={scaleValue}
              offsetValue={offsetValue}
              showMenu={showMenu}
              setShowMenu={setShowMenu}
            />
            <StatusBar style="light" />

            <ProfileRoutes />
            {location.pathname == "/proveedor/profile" && (
              <Navigate to="/proveedor/profile/information" />
            )}
          </>
        }
      />
      <Route
        path="/proveedor/ordenes/*"
        element={
          <>
            <AppProvBar
              closeButtonOffset={closeButtonOffset}
              scaleValue={scaleValue}
              offsetValue={offsetValue}
              showMenu={showMenu}
              setShowMenu={setShowMenu}
            />
            <StatusBar style="light" />

            <OrdenesRoutes />
            {location.pathname == "/proveedor/ordenes" && (
              <Navigate to="/proveedor/ordenes/principal" />
            )}
          </>
        }
      />
    </Routes>
  );
};
export default ProveedorRoutes;
