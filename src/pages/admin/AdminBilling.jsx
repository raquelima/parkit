import { useContext, useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { SwaggerClientContext, UserContext } from "../../App";
import Table from "../../components/Table";
import AutoHidingSnackbar from "../../components/AutoHidingSnackbar";
import fetchUserReservations from "../../api/fetchUserReservations";

/**
 * This a functional component that renders the admin billing page
 * @returns {JSX.Element} The Admin Billing component
 */
function AdminBilling() {
  const client = useContext(SwaggerClientContext);
  const setUser = useContext(UserContext);

  const [reservations, setReservations] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  //Display snackbar
  const handleClickSnack = () => {
    setOpenSnackbar(true);
  };

  /**
   * Handles errors according to the error status
   * @param {Object} e An error object
   */
  const handleError = (e) => {
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
  };

  /**
   * Fetches user reservations
   */
  const fetchReservations = () => {
    fetchUserReservations(client)
      .then((result) => {
        setReservations(result);
        setLoading(false);
      })
      .catch(handleError);
  };

  const billingColumns = [
    {
      field: "user",
      headerName: "User",
      flex: 1,
      width: 200,
    },
    {
      field: "month1",
      headerName: "Jun 23",
      flex: 1,
      sortable: false,
      width: 200,
    },
    {
      field: "month2",
      headerName: "May 23",
      flex: 1,
      sortable: false,
      width: 200,
    },
    {
      field: "month3",
      headerName: "Apr 23",
      flex: 1,
      sortable: false,
      width: 200,
    },
    {
      field: "month4",
      headerName: "Mar 23",
      flex: 1,
      sortable: false,
      width: 200,
    },
    {
      field: "month5",
      headerName: "Feb 23",
      flex: 1,
      sortable: false,
      width: 200,
    },
    {
      field: "month6",
      headerName: "Jan 23",
      flex: 1,
      sortable: false,
      width: 200,
    },
  ];

  useEffect(() => {
    fetchReservations();
  }, [client]);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Admin billing</Typography>
      </Box>

      <Box>
        {loading ? (
          <CircularProgress />
        ) : reservations?.length ? (
          <Table data={reservations} columns={billingColumns} admin={true} />
        ) : (
          <Alert sx={{ mt: 3 }} severity="info">
            You have no upcoming reservations
          </Alert>
        )}
      </Box>

      <AutoHidingSnackbar
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        severity={error ? "error" : "success"}
        message={error}
      />
    </Box>
  );
}

export default AdminBilling;
