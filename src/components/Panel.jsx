import {
  Toolbar,
  Typography,
  Drawer,
  List,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { THEME_COLOR } from "../Constants";

/**
 * A functional component that renders a MUI Drawer
 * @param {ReactElement} children - The children components to be rendered
 * @param {string} headerTitle - The panel header title
 * @param {boolean} loading - A boolean flag indicating whether the parent component is loading
 * @param {boolean} openPanel - A boolean flag indicating whether the panel should be displayed
 * @param {Function} handleClosePanel - A function to close the panel
 * @returns {JSX.Element} The Panel component
 */
function Panel({
  children,
  headerTitle,
  loading,
  openPanel,
  handleClosePanel,
}) {
  return (
    <Drawer
      sx={{
        width: 320,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 320,
          zIndex: 1201,
        },
      }}
      variant="persistent"
      anchor="right"
      open={openPanel}
    >
      <List disablePadding>
        <Toolbar
          variant="dense"
          sx={{
            minHeight: 48,
            backgroundColor: THEME_COLOR,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography color="white">{headerTitle}</Typography>
          <IconButton
            aria-label="close panel"
            onClick={handleClosePanel}
            sx={{ color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>

        {loading ? <CircularProgress /> : children}
      </List>
    </Drawer>
  );
}
export default Panel;
