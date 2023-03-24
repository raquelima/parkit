import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import { UserContext } from "../App";
import CustomSnackbar from "../components/CustomSnackBar";
import logo from "../assets/adobeLogoSmall.png";
import { THEMECOLOR } from "../Constants";

function Login({ user }) {
  const navigate = useNavigate();

  const setUser = useContext(UserContext);

  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [userInput, setUserInput] = useState({
    userId: "dGVzdEBhZG9iZS5jb20=",
  });

  const handleSaveCredentials = (event) => {
    setUserInput({ ...userInput, [event.target.name]: event.target.value });
  };

  const handleClickSnack = () => {
    setOpenSnackbar(true);
  };

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
      <CustomSnackbar
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        severity={"error"}
        message={error}
      />
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
              sx={{ backgroundColor: THEMECOLOR, width: "130px", mt: 5 }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Login;
