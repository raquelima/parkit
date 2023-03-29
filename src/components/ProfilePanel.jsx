import ProfileDetails from "./profileDetails";
import Panel from "./Panel";

/**
 * A functional component that renders the profile panel
 * @param {Object} user - An object containing the logged in user's username, password and ID
 * @param {number} totalVehicles - the total number of vehicles
 * @param {number} totalReservations - the total number of reservations
 * @param {boolean} openPanel - A boolean flag indicating whether the panel should be displayed
 * @param {Function} setOpenPanel - A function that sets the value of openPanel
 * @returns {JSX.Element} The ProfilePanel component
 */
function ProfilePanel({
  user,
  totalVehicles,
  totalReservations,
  openPanel,
  setOpenPanel,
}) {
  /**
   * Closes panel
   */
  const handleClosePanel = () => {
    setOpenPanel(false);
  };

  return (
    <Panel
      children={
        <ProfileDetails
          user={user}
          totalVehicles={totalVehicles}
          totalReservations={totalReservations}
        />
      }
      headerTitle="Profile"
      loading={false}
      openPanel={openPanel}
      handleClosePanel={handleClosePanel}
    />
  );
}
export default ProfilePanel;
