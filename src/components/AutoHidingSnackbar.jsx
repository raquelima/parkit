import { Snackbar, Alert } from "@mui/material";
/**
 * A functional component that renders a MUI Snackbar with an Alert component, used to display success and error messages
 * @param {boolean} openSnackbar - A boolean flag indicating whether the Snackbar should be displayed
 * @param {Function} setOpenSnackbar - A function to update the value of openSnackbar
 * @param {string} severity - The severity of the Alert component, which affects its appearance (either 'error', 'warning', 'info', or 'success')
 * @param {string} message - The message to be displayed in the Alert component
 * @returns {JSX.Element} The AutoHidingSnackbar component
 */
function AutoHidingSnackbar({
  openSnackbar,
  setOpenSnackbar,
  severity,
  message,
}) {
  return (
    <Snackbar
      open={openSnackbar}
      autoHideDuration={9000}
      onClose={() => setOpenSnackbar(false)}
    >
      <Alert severity={severity} onClose={() => setOpenSnackbar(false)}>
        {message}
      </Alert>
    </Snackbar>
  );
}
export default AutoHidingSnackbar;
