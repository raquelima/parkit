import { useState, useContext, useEffect } from "react";
import { Box, Divider } from "@mui/material";
import { format } from "date-fns";
import { UserContext } from "../App";
import ReservationDetails from "./ReservationDetails";
import VehicleDetails from "./VehicleDetails";
import Panel from "./Panel";
import CreateButton from "./CreateButton";
import fetchUserVehicles from "../api/fetchUserVehicles";
import createReservation from "../api/createReservation";
import fetchUser from "../api/fetchUser";

function CreateReservationPanel({
  client,
  selectedParkingSpot,
  reservationDate,
  reservationTime,
  halfDay,
  am,
  openPanel,
  setOpenPanel,
  setSelectedParkingSpot,
  setError,
  setSuccess,
  handleClickSnack,
}) {
  const setUser = useContext(UserContext);

  const [profileUser, setProfileUser] = useState("");

  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const selectedVehicle = vehicles?.find(
    (vehicle) => vehicle.id === selectedVehicleId
  );

  const handleClosePanel = () => {
    setOpenPanel(false);
    setSelectedParkingSpot(null);
  };

  const handleChange = (event) => {
    setSelectedVehicleId(event.target.value);
  };

  const handleClick = () => {
    createReservation(
      client,
      selectedParkingSpot?.id,
      profileUser?.id,
      selectedVehicleId,
      format(reservationDate, "yyyy-MM-dd").toString(),
      halfDay,
      am
    )
      .then(() => {
        setSuccess("Reservation was created");
        handleClickSnack();
        setOpenPanel(false);
      })
      .catch((e) => {
        if (e.message === "401") {
          setUser(null);
          handleClickSnack();
        } else if (e.message === "409") {
          setError("Conflict");
          handleClickSnack();
        } else if (e.message === "500") {
          setError("Internal Server Error");
          handleClickSnack();
        }
      });
  };

  const handleError = (e) => {
    setLoading(false);
    if (e.message === "401") {
      setUser(null);
      handleClickSnack();
    } else if (e.message === "400") {
      setError("Oops something went wrong");
      handleClickSnack();
    } else if (e.message === "500") {
      setError("Internal Server Error");
      handleClickSnack();
    }
  };

  useEffect(() => {
    Promise.all([fetchUserVehicles(client), fetchUser(client)])
      .then(([vehicles, user]) => {
        setVehicles(vehicles);
        setSelectedVehicleId(vehicles[0]?.id);
        setProfileUser(user);
        setLoading(false);
      })
      .catch(handleError);
  }, [client]);

  return (
    <Panel
      children={
        <Box sx={{ px: 3 }}>
          <ReservationDetails
            selectedParkingSpot={selectedParkingSpot}
            profileUser={profileUser}
            reservationDate={reservationDate}
            reservationTime={reservationTime}
            vehicles={vehicles}
            selectedVehicleId={selectedVehicleId}
            handleChange={handleChange}
          />
          <Divider />
          <VehicleDetails selectedVehicle={selectedVehicle} />
          <CreateButton
            handleClick={handleClick}
            btnText="Reserve Space"
            sx={{ display: "flex", justifyContent: "center", pt: 7 }}
          />
        </Box>
      }
      headerTitle="Create Reservation"
      loading={loading}
      openPanel={openPanel}
      handleClosePanel={handleClosePanel}
    />
  );
}
export default CreateReservationPanel;
