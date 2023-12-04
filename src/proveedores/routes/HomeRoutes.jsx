import { React } from "react";
import { Routes, Route } from "react-router-native";
import { View } from "react-native";

import StyledText from "../../styles/StyledText";
import HomeProveedorPage from "../pages/HomeProveedorPage";
import SearchProveedorPage from "../pages/SearchProveedorPage";
import NotificationsProveedorPage from "../pages/NotificationsProveedorPage";
const HomeRoutes = () => {
  return (
    <Routes>
      <Route path="ofertas" element={<HomeProveedorPage />} />
      <Route
        path="demandas"
        element={
          <View>
            <StyledText>DEMANDAS</StyledText>
          </View>
        }
      />
      <Route path="search" element={<SearchProveedorPage />} />
      <Route path="notifications" element={<NotificationsProveedorPage />} />
    </Routes>
  );
};
export default HomeRoutes;
