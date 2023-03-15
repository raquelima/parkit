import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import Reservations from "./components/Reservations.jsx";
import ParkingOverview from "./components/ParkingOverview.jsx";
import Vehicles from "./components/Vehicles.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="reservations" element={<Reservations />} />
      <Route path="parking_overview" element={<ParkingOverview />} />
      <Route path="vehicles" element={<Vehicles />} />
    </Routes>
  );
}

export default AppRoutes;
