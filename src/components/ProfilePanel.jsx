import ProfileDetails from "./profileDetails";
import Panel from "./Panel";

/**
 *
 * @param {*} user
 * @param {*} totalVehicles
 * @param {*} totalReservations
 * @param {*} openPanel
 * @param {*} setOpenPanel
 * @returns
 */
function ProfilePanel({
  user,
  totalVehicles,
  totalReservations,
  openPanel,
  setOpenPanel,
}) {
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
