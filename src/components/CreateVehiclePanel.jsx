import { useState, useContext } from "react";
import { Box } from "@mui/material";
import { UserContext } from "../App";
import CreateVehicleInput from "./CreateVehicleInput";
import CreateButton from "./CreateButton";
import Panel from "./Panel";
import createVehicle from "../api/createVehicle";

/**
 * A functional component that renders a panel to create vehicles
 * @param {Object} client - The Swagger Client object
 * @param {boolean} openPanel - A boolean flag indicating whether the panel should be displayed
 * @param {Function} setOpenPanel - A function that sets the value of openPanel
 * @param {Function} fetchVehicles - a function that fetches the user vehicles
 * @param {Function} setError - A function that sets an error message
 * @param {Function} setSuccess - A function that sets an success message
 * @param {Function} handleClickSnack - A function that displays a snackbar
 * @returns {JSX.Element} The CreateVehiclePanel component
 */
function CreateVehiclePanel({
  client,
  openPanel,
  setOpenPanel,
  fetchVehicles,
  setError,
  setSuccess,
  handleClickSnack,
}) {
  const setUser = useContext(UserContext);

  const [newVehicle, setNewVehicle] = useState({});
  const [ev, setEv] = useState(true);

  /**
   * Saves user input in the state
   * @param {Object} event
   */
  const handleSaveInput = (event) => {
    setNewVehicle({ ...newVehicle, [event.target.name]: event.target.value });
  };

  /**
   * Closes the panel and clears the state
   */
  const handleClosePanel = () => {
    setOpenPanel(false);
    setNewVehicle(null);
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
   * Creates a vehicle
   */
  const handleCreateVehicle = () => {
    createVehicle(
      client,
      ev,
      newVehicle.licensePlateNumber,
      newVehicle.make,
      newVehicle.model
    )
      .then(() => {
        fetchVehicles();
        setError(null);
        setSuccess("Vehicle was created");
        handleClickSnack();
        setOpenPanel(false);
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
          <CreateVehicleInput
            handleSaveInput={handleSaveInput}
            ev={ev}
            handleToggleSelection={handleToggleSelection}
          />
          <CreateButton
            handleClick={handleCreateVehicle}
            btnText="Add vehicle"
            sx={{ display: "flex", justifyContent: "center", pt: 7 }}
          />
        </Box>
      }
      headerTitle="Create Vehicle"
      loading={false}
      openPanel={openPanel}
      handleClosePanel={handleClosePanel}
    />
  );
}
export default CreateVehiclePanel;
