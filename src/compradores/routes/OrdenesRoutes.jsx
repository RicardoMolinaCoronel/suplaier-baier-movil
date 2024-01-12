import { React } from "react";
import { Routes, Route } from "react-router-native";
import OrdenesCompradorPage from "../pages/OrdenesCompradorPage";
// import OrdenesProveedorPage from "../pages/OrdenesProveedorPage";
const OrdenesRoutes = () => {
  return (
    <Routes>
      <Route path="principal" element={<OrdenesCompradorPage />} />
    </Routes>
  );
};
export default OrdenesRoutes;
