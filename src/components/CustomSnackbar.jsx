import { Snackbar, Alert } from "@mui/material";

function CustomSnackbar({ openSnackbar, setOpenSnackbar, severity, message }) {
  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={6000}
      onClose={() => setOpenSnackbar(false)}
    >
      <Alert severity={severity} onClose={() => setOpenSnackbar(false)}>
        {message}
      </Alert>
    </Snackbar>
  );
}
export default CustomSnackbar;
