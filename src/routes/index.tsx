import { Routes, Route, Navigate } from "react-router-dom";
import Pessoas from "../pages/Pessoas";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Pessoas />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
