import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

function CustomListItem({ to, primary, icon, buttonProps }) {
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
          primaryTypographyProps={{ sx: { color: "white" } }}
        />
      </ListItemButton>
    </ListItem>
  );
}
export default CustomListItem;
