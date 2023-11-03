import { React } from "react";
import { Routes, Route } from "react-router-native";
import OrdenesProveedorPage from "../pages/OrdenesProveedorPage";
const OrdenesRoutes = () => {
  return (
    <Routes>
      <Route path="principal" element={<OrdenesProveedorPage />} />
    </Routes>
  );
};
export default OrdenesRoutes;
