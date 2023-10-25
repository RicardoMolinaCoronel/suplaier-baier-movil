import { React } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-native";
import StyledText from "../../styles/StyledText";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import HomeRoutes from "./HomeRoutes";
import ProfileRoutes from "./ProfileRoutes";
import AppProvBar from "../components/AppProvBar";
import NavigationBar from "../components/NavigationBar";
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
    </Routes>
  );
};
export default ProveedorRoutes;
