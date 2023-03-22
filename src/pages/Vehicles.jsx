import { Box, Typography, CircularProgress } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { SwaggerClientContext } from "../App";
import Table from "../components/Table";
import CreateReservationButton from "../components/CreateReservationButton";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import fetchUserVehicles from "../api/fetchUserVehicles";

function Vehicles() {
  const client = useContext(SwaggerClientContext);

  const [vehicles, setVehicles] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const deleteVehicle = (id) => {
    client?.apis.vehicles.removeVehicle({ id: id }).then(() =>
      //twice in code
      fetchUserVehicles(client).then((result) => {
        setVehicles(result?.vehicles);
        setError(result?.error);
        setLoading(result?.loading);
      })
    );
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
            aria-label="delete vehicle"
            color="error"
            onClick={() => deleteVehicle(vehicle.row.id)}
          >
            <CloseIcon />
          </IconButton>
        );
      },
    },
  ];

  useEffect(() => {
    fetchUserVehicles(client).then((result) => {
      setVehicles(result?.vehicles);
      setError(result?.error);
      setLoading(result?.loading);
    });
  }, [client]);
  return (
    <Box>
      {error}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">Your Vehicles</Typography>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : vehicles?.length ? (
        <Table data={vehicles} columns={vehiclesColumns} />
      ) : (
        <p>No vehicles found</p>
      )}
    </Box>
  );
}

export default Vehicles;
