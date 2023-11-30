import { React } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-native";
import { StatusBar } from "expo-status-bar";
import HomeRoutes from "./HomeRoutes";
import ProfileRoutes from "./ProfileRoutes";
import AppCompBar from "../components/AppCompBar";
import NavigationBar from "../components/NavigationBar";
import OrdenesRoutes from "./OrdenesRoutes";
const CompradorRoutes = ({
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
        path="/comprador/home/*"
        element={
          <>
            <AppCompBar
              closeButtonOffset={closeButtonOffset}
              scaleValue={scaleValue}
              offsetValue={offsetValue}
              showMenu={showMenu}
              setShowMenu={setShowMenu}
            />
            <StatusBar style="light" />

            <HomeRoutes />
            {location.pathname == "/comprador/home" && (
              <Navigate to="/comprador/home/ofertas" />
            )}
            <NavigationBar />
          </>
        }
      />
      <Route
        path="/comprador/profile/*"
        element={
          <>
            <AppCompBar
              closeButtonOffset={closeButtonOffset}
              scaleValue={scaleValue}
              offsetValue={offsetValue}
              showMenu={showMenu}
              setShowMenu={setShowMenu}
            />
            <StatusBar style="light" />

            <ProfileRoutes />
            {location.pathname == "/comprador/profile" && (
              <Navigate to="/comprador/profile/information" />
            )}
          </>
        }
      />
      <Route
        path="/comprador/ordenes/*"
        element={
          <>
            <AppCompBar
              closeButtonOffset={closeButtonOffset}
              scaleValue={scaleValue}
              offsetValue={offsetValue}
              showMenu={showMenu}
              setShowMenu={setShowMenu}
            />
            <StatusBar style="light" />

            <OrdenesRoutes />
            {location.pathname == "/comprador/ordenes" && (
              <Navigate to="/comprador/ordenes/principal" />
            )}
          </>
        }
      />
    </Routes>
  );
};
export default CompradorRoutes;
