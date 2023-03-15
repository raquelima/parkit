import { IconButton, Avatar, AppBar, Toolbar } from "@mui/material";
import { themeColor } from "./Constants";
import { drawerWidth } from "./Constants";

function TopBar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        backgroundColor: themeColor,
      }}
    >
      <Toolbar variant="dense" sx={{ justifyContent: "flex-end" }}>
        <IconButton>
          <Avatar
            src="https://d113wk4ga3f0l0.cloudfront.net/c?o=eJyVkE9rwzAMxb-LYLfGTpOmS3LtoTA6Bu1hR2MSNXHzx8ZyEpbS7z4HyrIdJ9DhPQn0e7oD6cEWKAbbQg61c4ZyzilmspOz7uVErNAd981aVdWOnC4apjpZIbHBtFqWxIzV5VA4pXveYamkUA47YSyOCif67SWv2TaO-XYf7XbhPs22wflSSbwd3j_e5vMwH6fPutClPDU8XCoSp0ugCt0HYcpupoINNPjlSa_J9RpnXk6qdDXkaRZuoMYF8Sk8stHkr0J-h__Fk0To_sSapEPbSdsQX_fEj8tMX60skCQvsNI8ZalItyMKg_7fvfejZAMWSc0oKitH5ZZcBz9CC4_HN4sgja0=&s=98449b61c298785137ccf2cf8e23077d443b96a5"
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
