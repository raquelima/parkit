import { useState } from "react";
import { useLocation } from "react-router-dom";
import { List, Divider, Typography, Box } from "@mui/material";
import NavListitem from "./NavListitem";
import { NAV_ITEM_LIST } from "../../Constants";

/**
 * A functional component that renders MUI List components representing the list of the side navigation bar
 * @returns {JSX.Element} The SideNavBarList component
 */
function SideNavBarList({ open }) {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const location = useLocation();
  const isAdmin = JSON.parse(localStorage.getItem("user"))?.role == "admin";

  /**
   * Returns an object with button properties for a given item and index
   * @param {Object} item - The item for which button properties are being generated
   * @param {number} index - The index of the item in the list
   * @returns {Object} An object with two properties:
   *  selected: A boolean indicating if the item is currently selected based on the current location.
   *  onClick: A function to set the selected index to the current index.
   */
  const buttonProps = (item, index) => ({
    selected: location.pathname === item.path,
    onClick: () => setSelectedIndex(index),
  });

  return (
    <List sx={{ height: "100%" }}>
      <Box sx={{ px: 1 }}>
        {open && (
          <Typography
            variant="subtitle2"
            fontWeight={300}
            color="white"
            sx={{ pl: "15px" }}
          >
            Booking
          </Typography>
        )}
        <List>
          {NAV_ITEM_LIST.slice(0, 3).map((item, index) => (
            <NavListitem
              key={item.page}
              to={item.path}
              primary={item.page}
              icon={item.icon}
              buttonProps={buttonProps(item, index)}
            />
          ))}
        </List>
        <Divider />
        {open && (
          <Typography
            variant="subtitle2"
            fontWeight={300}
            color="white"
            sx={{ pl: "15px", pt: 1 }}
          >
            Management
          </Typography>
        )}
        <List>
          {NAV_ITEM_LIST.slice(3, 5).map((item, index) => (
            <NavListitem
              key={item.page}
              to={item.path}
              primary={item.page}
              icon={item.icon}
              buttonProps={buttonProps(item, index)}
            />
          ))}
        </List>
        {isAdmin && (
          <>
            <Divider />
            {open && (
              <Typography
                variant="subtitle2"
                fontWeight={300}
                color="white"
                sx={{ pl: "15px", pt: 1 }}
              >
                Admin
              </Typography>
            )}
            <List>
              {NAV_ITEM_LIST.slice(5, 10).map((item, index) => (
                <NavListitem
                  key={item.page}
                  to={item.path}
                  primary={item.page}
                  icon={item.icon}
                  buttonProps={buttonProps(item, index)}
                />
              ))}
            </List>
          </>
        )}

        {open && (
          <List sx={{ position: "absolute", bottom: "0" }}>
            {NAV_ITEM_LIST.slice(10, 14).map((item, index) => (
              <NavListitem
                key={item.page}
                to={item.path}
                target="_blank"
                primary={item.page}
                icon={item.icon}
                buttonProps={buttonProps(item, index)}
              />
            ))}
          </List>
        )}
      </Box>
    </List>
  );
}

export default SideNavBarList;
