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

/**
 * A functional component that renders the panel to create reservations
 * @param {Object} client - The Swagger Client object
 * @param {Object} selectedParkingSpot - The current selected parking spot object
 * @param {Object} reservationDate - The selected reservation date object
 * @param {string} reservationTime - The selected reservation time
 * @param {boolean} halfDay - A boolean flag indicating whether the reservation is for a full or half-day
 * @param {boolean} openPanel - A boolean flag indicating whether the panel should be displayed
 * @param {Function} setOpenPanel - A function that sets the value of openPanel
 * @param {Function} setSelectedParkingSpot - A function that sets the value of selectedParkingSpot
 * @param {Function} setError - A function that sets an error message
 * @param {Function} setSuccess - A function that sets a success message
 * @param {Function} handleClickSnack - A function that displays a snackbar
 * @param {Function} fetchAvailableParkingSpots - a function that fetches the available parking spots
 * @returns {JSX.Element} The CreateReservationPanel component
 */
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
  fetchAvailableParkingSpots,
}) {
  const setUser = useContext(UserContext);

  const [profileUser, setProfileUser] = useState("");

  const [loading, setLoading] = useState(true);
  const [vehicles, setVehicles] = useState(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const selectedVehicle = vehicles?.find(
    (vehicle) => vehicle.id === selectedVehicleId
  );

  /**
   * Closes the panel and unselects parking spot
   */
  const handleClosePanel = () => {
    setOpenPanel(false);
    setSelectedParkingSpot(null);
  };

  /**
   * Sets the selected vehicle ID to the value of the event target's value property.
   * @param {Event} event - An onChange event
   */
  const handleSetSelectedVehicleId = (event) => {
    setSelectedVehicleId(event.target.value);
  };

  /**
   * Handles the creation of a reservation and handles possible error
   */
  const handleCreateReservation = () => {
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
        fetchAvailableParkingSpots();
        setSelectedParkingSpot();
        setSuccess("Reservation was created");
        handleClickSnack();
        setOpenPanel(false);
      })
      .catch((e) => {
        if (e.message === "401") {
          setUser(null);
          handleClickSnack();
        } else if (e.message === "409") {
          setError(
            "Could not create reservation. The reservation you want to create conflicts with an existing reservation. Select a different parking spot or date/time"
          );
          handleClickSnack();
        } else if (e.message === "500") {
          setError("Internal Server Error");
          handleClickSnack();
        }
      });
  };

  /**
   * Handles errors according to the error status
   * @param {Object} e - An error object
   */
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
            handleSetSelectedVehicleId={handleSetSelectedVehicleId}
          />
          <Divider />
          <VehicleDetails selectedVehicle={selectedVehicle} />
          <CreateButton
            handleClick={handleCreateReservation}
            btnText="Reserve Space"
            sx={{ display: "flex", justifyContent: "center", pt: 3 }}
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
