import {
  Toolbar,
  Typography,
  Drawer,
  List,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { THEMECOLOR } from "../Constants";

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
            minHeight: 44,
            backgroundColor: THEMECOLOR,
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
