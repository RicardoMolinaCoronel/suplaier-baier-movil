import { React } from "react";
import { Routes, Route } from "react-router-native";
import HomeCompradorPage from "../pages/HomeCompradorPage";
import Notificaciones_Comprador from "../pages/Notificaciones_Comprador";
import Busqueda_Comprador from "../pages/Busqueda_Comprador";
import DemandasCompradorPage from "../pages/DemandasCompradorPage";
const HomeRoutes = () => {
  return (
    <Routes>
      <Route path="ofertas" element={<HomeCompradorPage />} />
      <Route path="demandas" element={<DemandasCompradorPage />} />
      <Route path="search" element={<Busqueda_Comprador />} />
      <Route path="notifications" element={<Notificaciones_Comprador />} />
    </Routes>
  );
};
export default HomeRoutes;
