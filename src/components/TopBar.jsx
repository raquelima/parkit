import { IconButton, Avatar, AppBar, Toolbar } from "@mui/material";
import { THEMECOLOR } from "../Constants";
import { DRAWERWIDTH } from "../Constants";
import profileImage from "../assets/profileImage.svg";

function TopBar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${DRAWERWIDTH}px)`,
        ml: `${DRAWERWIDTH}px`,
        backgroundColor: THEMECOLOR,
       
      }}
    >
      <Toolbar variant="dense" sx={{ justifyContent: "flex-end",  minHeight: 44 }}>
        <IconButton>
          <Avatar
            src={profileImage}
            style={{
              width: "30px",
              height: "30px",
            }}
          />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
