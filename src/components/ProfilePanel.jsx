import ProfileDetails from "./profileDetails";
import Panel from "./Panel";

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
