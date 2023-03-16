import { Route, Routes } from "react-router-dom";
import Dashboard from "./views/Dashboard.jsx";
import Reservations from "./views/Reservations.jsx";
import ParkingOverview from "./views/ParkingOverview.jsx";
import Vehicles from "./views/Vehicles.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/reservations" element={<Reservations />} />
      <Route path="/parking_overview" element={<ParkingOverview />} />
      <Route path="/vehicles" element={<Vehicles />} />
    </Routes>
  );
}

export default AppRoutes;
