import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { UserContext } from "../App";
import AutoHidingSnackbar from "../components/AutoHidingSnackbar";
import logo from "../assets/adobeLogoSmall.png";
import { THEME_COLOR } from "../Constants";

/**
 * This is a functional component that renders the login page
 * @param {Object} user - An object containing the logged in user's username, password and ID
 * @returns {JSX.Element} The Login component
 */
function Login({ user }) {
  const navigate = useNavigate();

  const setUser = useContext(UserContext);

  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [userInput, setUserInput] = useState({
    userId: "dGVzdEBhZG9iZS5jb20=",
    role: "admin",
  });

  /**
   * Takes user credentials from input and sets it in the state
   * @param {Event} event - An onChange event
   */
  const handleSaveCredentials = (event) => {
    setUserInput({ ...userInput, [event.target.name]: event.target.value });
  };

  /**
   * Displays snackbar
   */
  const handleClickSnack = () => {
    setOpenSnackbar(true);
  };

  /**
   * Checks if entered credentials are correct, if they are sets user in the Local Storage and triggers rerender otherwise displays an error message
   * @param {Event} event An onChange Event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      userInput.username == "test@adobe.com" &&
      userInput.password == "testPassword"
    ) {
      localStorage.setItem("user", JSON.stringify(userInput));
      setUser(userInput);
    } else {
      setError("Wrong username or password");
      handleClickSnack();
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <Box
      sx={{
        background: "linear-gradient(#303E4D, #C6545A)",
        position: "absolute",
        width: "100%",
        height: "100%",
      }}
    >
      <Container component="main" maxWidth={false} sx={{ maxWidth: "450px" }}>
        <Box
          sx={{
            boxShadow: 3,
            borderRadius: 1,
            py: 4,
            mt: 30,
            backgroundColor: "white",
          }}
        >
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 2,
            }}
            onSubmit={handleSubmit}
          >
            <img src={logo} width={30} height={25} />

            <Typography component="h1" variant="h4" mt={3}>
              Login
            </Typography>
            <TextField
              sx={{
                width: { md: 230 },
                mt: 2,
              }}
              InputLabelProps={{
                style: { fontSize: 15, padding: 0 },
                required: false,
              }}
              inputProps={{
                style: {
                  padding: 0,
                },
              }}
              name="username"
              label="Username"
              variant="standard"
              size="small"
              required
              onChange={handleSaveCredentials}
            />
            <TextField
              sx={{
                width: { md: 230 },
                mt: 1,
              }}
              InputLabelProps={{
                style: { fontSize: 15, padding: 0 },
                required: false,
              }}
              inputProps={{
                style: {
                  padding: 0,
                },
              }}
              name="password"
              type="password"
              label="Password"
              variant="standard"
              size="small"
              required
              onChange={handleSaveCredentials}
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ backgroundColor: THEME_COLOR, width: "130px", mt: 5 }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>

      <AutoHidingSnackbar
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        severity={"error"}
        message={error}
      />
    </Box>
  );
}

export default Login;
