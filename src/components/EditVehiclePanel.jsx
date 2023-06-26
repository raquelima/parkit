import { useState, useContext } from "react";
import { Box } from "@mui/material";
import { UserContext } from "../App";
import VehicleInput from "./VehicleInput";
import CreateButton from "./CreateButton";
import Panel from "./Panel";
import createVehicle from "../api/createVehicle";

/**
 * A functional component that renders a panel to edit a vehicle
 * @param {Object} client - The Swagger Client object
 * @param {Object} selectedVehicle - The vehicle to be edited
 * @param {boolean} openEditPanel - A boolean flag indicating whether the panel should be displayed
 * @param {Function} setOpenEditPanel - A function that sets the value of openEditPanel
 * @param {Function} fetchVehicles - a function that fetches the user vehicles
 * @param {Function} setError - A function that sets an error message
 * @param {Function} setSuccess - A function that sets an success message
 * @param {Function} handleClickSnack - A function that displays a snackbar
 * @returns {JSX.Element} The CreateVehiclePanel component
 */
function EditVehiclePanel({
  client,
  selectedVehicle,
  openEditPanel,
  setOpenEditPanel,
  fetchVehicles,
  setError,
  setSuccess,
  handleClickSnack,
}) {
  const setUser = useContext(UserContext);

  const [vehicle, setVehicle] = useState(selectedVehicle);
  const [ev, setEv] = useState(false);

  /**
   * Saves user input in the state
   * @param {Object} event
   */
  const handleSaveInput = (event) => {
    setVehicle({ ...vehicle, [event.target.name]: event.target.value });
  };

  /**
   * Closes the panel and clears the state
   */
  const handleClosePanel = () => {
    setOpenEditPanel(false);
    setVehicle(null);
  };

  /**
   * Handles errors according to the error status
   * @param {Object} e - An error object
   */
  const handleError = (e) => {
    if (e.message === "401") {
      setUser(null);
      handleClickSnack();
    } else if (e.message === "409") {
      setError(
        "Vehicle with the same plate number already exists. Please enter a different plate number or remove the vehicle."
      );
      handleClickSnack();
    } else if (e.message === "500") {
      setError("Internal Server Error");
      handleClickSnack();
    }
  };

  /**
   * Updates a vehicle
   */
  const handleUpdateVehicle = () => {
    createVehicle(
      client,
      ev,
      vehicle.licensePlateNumber,
      vehicle.make,
      vehicle.model
    )
      .then(() => {
        setError(null);
        setSuccess("Vehicle was updated");
        handleClickSnack();
        setOpenEditPanel(false);
      })
      .catch(handleError);
  };

  /**
   * Handles the ev toggle selection making sure on button is always selected and sets the selected value in the state
   * @param {Event} event - An onChange event
   * @param {boolean} toggleValue - Indicates which toggle button is selected
   */
  const handleToggleSelection = (event, toggleValue) => {
    if (toggleValue !== null) {
      setEv(toggleValue);
    }
  };

  return (
    <Panel
      children={
        <Box sx={{ px: 3 }}>
          <VehicleInput
            handleSaveInput={handleSaveInput}
            ev={selectedVehicle?.ev}
            handleToggleSelection={handleToggleSelection}
            vehicle={vehicle}
          />
          <CreateButton
            handleClick={handleUpdateVehicle}
            btnText="Update vehicle"
            sx={{ display: "flex", justifyContent: "center", pt: 7 }}
          />
        </Box>
      }
      headerTitle="Edit Vehicle"
      loading={false}
      openPanel={openEditPanel}
      handleClosePanel={handleClosePanel}
    />
  );
}
export default EditVehiclePanel;
