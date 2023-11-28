import { React } from "react";
import { Routes, Route } from "react-router-native";
import { View } from "react-native";
import HomeCompradorPage from "../pages/HomeCompradorPage";
import StyledText from "../../styles/StyledText";
const HomeRoutes = () => {
  return (
    <Routes>
      <Route path="ofertas" element={<HomeCompradorPage />} />
      <Route
        path="search"
        element={
          <View>
            <StyledText>BUSCAR</StyledText>
          </View>
        }
      />
      <Route
        path="notifications"
        element={
          <View>
            <StyledText>NOTIFICACIONES</StyledText>
          </View>
        }
      />
    </Routes>
  );
};
export default HomeRoutes;
