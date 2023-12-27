import { React } from "react";
import { Routes, Route } from "react-router-native";
import { View } from "react-native";
import HomeCompradorPage from "../pages/HomeCompradorPage";
import StyledText from "../../styles/StyledText";
import Notificaciones_Comprador from "../pages/Notificaciones_Comprador";
import Busqueda_Comprador from "../pages/Busqueda_Comprador";
const HomeRoutes = () => {
  return (
    <Routes>
      <Route path="ofertas" element={<HomeCompradorPage />} />
      <Route
        path="demandas"
        element={
          <View>
            <StyledText>DEMANDAS</StyledText>
          </View>
        }
      />
      <Route
        path="search"
        element={
          <Busqueda_Comprador/>
        }
      />
      <Route
        path="notifications"
        element={
          <Notificaciones_Comprador/>
        }
      />
    </Routes>
  );
};
export default HomeRoutes;
