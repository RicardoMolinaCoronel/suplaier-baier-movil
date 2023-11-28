import { React } from "react";
import { Routes, Route } from "react-router-native";
import ProfilePage from "../pages/ProfilePage";

const ProfileRoutes = () => {
  return (
    <Routes>
      <Route path="information" element={<ProfilePage />} />
    </Routes>
  );
};
export default ProfileRoutes;
