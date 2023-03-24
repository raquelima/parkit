import { useState, useContext } from "react";
import { Box } from "@mui/material";
import { UserContext } from "../App";
import CreateVehicleInput from "./CreateVehicleInput";
import CreateButton from "./CreateButton";
import Panel from "./Panel";
import createVehicle from "../api/createVehicle";

/**
 *
 * @param {*} client
 * @param {*} openPanel
 * @param {*} setOpenPanel
 * @param {*} fetchVehicles
 * @param {*} setError
 * @param {*} setSuccess
 * @param {*} handleClickSnack
 * @returns
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

  const handleSaveInput = (event) => {
    setNewVehicle({ ...newVehicle, [event.target.name]: event.target.value });
  };

  const handleClosePanel = () => {
    setOpenPanel(false);
    setNewVehicle(null);
  };

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

  const handleClick = () => {
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

  const handleToggle = (event, toggle) => {
    if (toggle !== null) {
      setEv(toggle);
    }
  };

  return (
    <Panel
      children={
        <Box sx={{ px: 3 }}>
          <CreateVehicleInput
            handleSaveInput={handleSaveInput}
            ev={ev}
            handleToggle={handleToggle}
          />
          <CreateButton
            handleClick={handleClick}
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
