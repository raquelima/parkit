import { useContext, useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { SwaggerClientContext, UserContext } from "../App";
import Table from "../components/Table";
import AutoHidingSnackbar from "../components/AutoHidingSnackbar";
import CreateButton from "../components/CreateButton";
import CreateVehiclePanel from "../components/CreateVehiclePanel";
import EditVehiclePanel from "../components/EditVehiclePanel";
import fetchUserVehicles from "../api/fetchUserVehicles";
import removeVehicle from "../api/removeVehicle";

/**
 * This is a functional component that renders the vehicles page
 * @returns {JSX.Element} The Vehicles component
 */
function Vehicles() {
  const client = useContext(SwaggerClientContext);
  const setUser = useContext(UserContext);

  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehicles, setVehicles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openCreatePanel, setOpenCreatePanel] = useState(false);
  const [openEditPanel, setOpenEditPanel] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClickSnack = () => {
    setOpenSnackbar(true);
  };

  const fetchVehicles = () => {
    fetchUserVehicles(client)
      .then((result) => {
        setVehicles(result);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        if (e.message === "401") {
          setUser(null);
        } else if (e.message === "400") {
          setError("Oops something went wrong");
          handleClickSnack();
        } else if (e.message === "500") {
          setError("Internal Server Error");
          handleClickSnack();
        }
      });
  };

  const handleRemoveVehicle = (id) => {
    removeVehicle(client, id)
      .then(() => {
        fetchVehicles();
        setSuccess("Vehicle was deleted");
        handleClickSnack();
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        if (e.message === "401") {
          setUser(null);
        } else if (e.message === "409") {
          setError(
            "Can't delete vehicle associated to existing reservations. Please cancel these reservations before removing the vehicle"
          );
          handleClickSnack();
        } else if (e.message === "500") {
          setError("Internal Server Error");
          handleClickSnack();
        }
      });
  };

  const handleOpenEdit = (vehicle) => {
    setSelectedVehicle(vehicle);
    setOpenEditPanel(true);
  };

  const vehiclesColumns = [
    {
      field: "make",
      headerName: "Manufacture",
      flex: 1,
      width: 200,
    },
    {
      field: "model",
      headerName: "Model",
      flex: 1,
      sortable: false,
      width: 200,
    },
    {
      field: "license_plate_number",
      headerName: "Plate number",
      flex: 1,
      sortable: false,
      width: 200,
    },
    {
      field: "ev",
      headerName: "Electric",
      flex: 1,
      sortable: false,
      width: 200,
      valueGetter: (vehicle) => (vehicle.row.ev ? "Yes" : "No"),
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 100,
      renderCell: (vehicle) => {
        return (
          <>
            <Tooltip arrow title="edit vehicle">
              <IconButton
                aria-label="edit vehicle"
                onClick={() => handleOpenEdit(vehicle.row)}
              >
                <ModeEditOutlineIcon />
              </IconButton>
            </Tooltip>
            <Tooltip arrow title="remove vehicle">
              <IconButton
                aria-label="remove vehicle"
                color="error"
                onClick={() => handleRemoveVehicle(vehicle.row.id)}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Tooltip>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    fetchVehicles();
  }, [client]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">Your Vehicles</Typography>

        <CreateButton
          handleClick={() => setOpenCreatePanel(true)}
          btnText="Create vehicle +"
        />
      </Box>
      {loading ? (
        <CircularProgress />
      ) : vehicles?.length ? (
        <Table data={vehicles} columns={vehiclesColumns} />
      ) : (
        <Alert sx={{ mt: 3 }} severity="info">
          You have no vehicles registered
        </Alert>
      )}
      <CreateVehiclePanel
        client={client}
        openCreatePanel={openCreatePanel}
        setOpenCreatePanel={setOpenCreatePanel}
        fetchVehicles={fetchVehicles}
        setError={setError}
        setSuccess={setSuccess}
        handleClickSnack={handleClickSnack}
      />
      <EditVehiclePanel
        client={client}
        selectedVehicle={selectedVehicle}
        openEditPanel={openEditPanel}
        setOpenEditPanel={setOpenEditPanel}
        setError={setError}
        setSuccess={setSuccess}
        handleClickSnack={handleClickSnack}
      />
      <AutoHidingSnackbar
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        severity={error ? "error" : "success"}
        message={error ? error : success}
      />
    </Box>
  );
}

export default Vehicles;
