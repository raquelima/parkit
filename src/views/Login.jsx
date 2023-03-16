import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Grid, TextField, Button, Box } from "@mui/material";
import { themeColor } from "../Constants";
import logo from "../assets/adobe.png"

function Login() {
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
          >
            <img src={logo} width={30} height={25}/>
        
            <Typography component="h1" variant="h4" mt={3}>
              Login
            </Typography>
            <TextField
              sx={{
                width: { md: 230 },
                mt: 2
              }}
              InputLabelProps={{ style: { fontSize: 15, padding: 0 } }}
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
            />
            <TextField
              sx={{
                width: { md: 230 },
                mt: 1
              }}
              InputLabelProps={{ style: { fontSize: 15, padding: 0 } }}
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
            />
            <Button
              variant="contained"
              type="submit"
              sx={{ backgroundColor: themeColor, width: "130px", mt: 5 }}
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
