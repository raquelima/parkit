import { Snackbar, Alert } from "@mui/material";
/**
 *
 * @param {Boolean} openSnackbar
 * @param {*} setOpenSnackbar
 * @param {string} severity
 * @param {string} message
 * @returns
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
