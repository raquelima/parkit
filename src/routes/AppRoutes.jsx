import { Route, Routes, Outlet } from "react-router-dom";
import Dashboard from "../pages/Dashboard.jsx";
import Reservations from "../pages/Reservations.jsx";
import ParkingOverview from "../pages/ParkingOverview.jsx";
import Vehicles from "../pages/Vehicles.jsx";
import Billing from "../pages/Billing.jsx";
import AdminBilling from "../pages/admin/AdminBilling.jsx";
import AdminReservations from "../pages/admin/AdminReservations.jsx";
import AdminParkingSpots from "../pages/admin/AdminParkingSpots.jsx";
import AdminVehicles from "../pages/admin/AdminVehicles.jsx";
import AdminUsers from "../pages/admin/AdminUsers.jsx";

/**
 * This is a functional component that renders the application routes
 * @returns {JSX.Element} The AppRoutes component
 */
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="reservations" element={<Reservations />} />
      <Route path="parking_overview" element={<ParkingOverview />} />
      <Route path="vehicles" element={<Vehicles />} />
      <Route path="billing" element={<Billing />} />
      <Route path="admin" element={<AdminBilling />} />
      <Route path="admin/reservations" element={<AdminReservations />} />
      <Route path="admin/billing" element={<AdminBilling />} />
      <Route path="admin/parking_spots" element={<AdminParkingSpots />} />
      <Route path="admin/users" element={<AdminUsers />} />
      <Route path="admin/vehicles" element={<AdminVehicles />} />
    </Routes>
  );
}

export default AppRoutes;
