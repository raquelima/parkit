import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard.jsx";
import Reservations from "../pages/Reservations.jsx";
import ParkingOverview from "../pages/ParkingOverview.jsx";
import Vehicles from "../pages/Vehicles.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/reservations" element={<Reservations />} />
      <Route path="/parking_overview" element={<ParkingOverview />} />
      <Route path="/vehicles" element={<Vehicles />} />
      <Route path="/*" element={<Dashboard />} />
    </Routes>
  );
}

export default AppRoutes;
