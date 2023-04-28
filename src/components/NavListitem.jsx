import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

/**
 * A functional component that renders a navigation list item
 * @param {string} to - The path that that the item should navigate to when clicked
 * @param {string} primary - The primary text to be displayed
 * @param {ReactElement} icon - The icon to be displayed
 * @param {Object} buttonProps - The button properties object
 * @returns {JSX.Element} The NavListItem component
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
            borderRadius: "9px",
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
