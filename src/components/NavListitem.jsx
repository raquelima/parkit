import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

/**
 *
 * @param {*} to
 * @param {*} primary
 * @param {*} icon
 * @param {*} buttonProps
 * @returns
 */
function NavListitem({ to, primary, icon, buttonProps }) {
  return (
    <ListItem component={Link} to={to} disablePadding>
      <ListItemButton
        {...buttonProps}
        sx={{
          "&.Mui-selected": {
            backgroundColor: "rgba(255,48,48,0.12)",
            borderRadius: "9px",
          },
          ":hover": {
            backgroundColor: "rgba(255,48,48,0.12)",
          },
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText
          primary={primary}
          primaryTypographyProps={{ color: "white", fontWeight: "300" }}
        />
      </ListItemButton>
    </ListItem>
  );
}
export default NavListitem;
