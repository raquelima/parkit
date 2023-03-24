import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Alert,
} from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { SwaggerClientContext } from "../App";
import Table from "../components/Table";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import fetchUserVehicles from "../api/fetchUserVehicles";
import { THEMECOLOR } from "../Constants";
import CreateVehiclePanel from "../components/CreateVehiclePanel";
import removeVehicle from "../api/removeVehicle";
import { UserContext } from "../App";
import CustomSnackbar from "../components/CustomSnackBar";

function Vehicles() {
  const client = useContext(SwaggerClientContext);
  const setUser = useContext(UserContext);

  const [vehicles, setVehicles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openPanel, setOpenPanel] = useState(false);
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

  const handleClick = (id) => {
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
          setError("Can't delete vehicle associated to existing reservations");
          handleClickSnack();
        } else if (e.message === "500") {
          setError("Internal Server Error");
          handleClickSnack();
        }
      });
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
      field: "delete",
      headerName: " ",
      sortable: false,
      width: 70,
      renderCell: (vehicle) => {
        return (
          <IconButton
            aria-label="remove vehicle"
            color="error"
            onClick={() => handleClick(vehicle.row.id)}
          >
            <CloseIcon />
          </IconButton>
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
        <Button
          variant="contained"
          sx={{
            backgroundColor: THEMECOLOR,
            borderRadius: "4px",
            textTransform: "none",
          }}
          onClick={() => setOpenPanel(true)}
        >
          Create vehicle +
        </Button>
      </Box>
      <CustomSnackbar
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        severity={error ? "error" : "success"}
        message={error ? error : success}
      />
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
        openPanel={openPanel}
        setOpenPanel={setOpenPanel}
        fetchVehicles={fetchVehicles}
        setError={setError}
        setSuccess={setSuccess}
        handleClickSnack={handleClickSnack}
      />
    </Box>
  );
}

export default Vehicles;
