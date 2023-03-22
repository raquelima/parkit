import ParkingSpot from "./ParkingSpot";
import logo from "../assets/adobe.png";
import { Box } from "@mui/material";

function ParkingSpotOverview({
  parkingSpots,
  availableParkingSpots,
  selectedParkingSpot,
  setSelectedParkingSpot,
}) {
  const handleSelect = (parkingSpot) => {
    if (parkingSpot.id == selectedParkingSpot) {
      setSelectedParkingSpot(null);
    } else {
      setSelectedParkingSpot(parkingSpot.id);
    }
  };

  const isParkingSpotSelected = (parkingSpot) =>
    selectedParkingSpot === parkingSpot.id;

  //takes available spots array and checks if current spot id is in the array, if yes returns true
  const checkAvailability = (availableParkingSpotsArray, parkingSpotId) => {
    return availableParkingSpotsArray?.some(
      (availableParkingSpot) => availableParkingSpot.id == parkingSpotId
    );
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="70vh"
      sx={{
        border: 2,
        borderColor: "rgba(112,112,112,0.14)",
        borderRadius: 2,
        mt: 3,
      }}
    >
      <Box
        minHeight="55vh"
        minWidth="80vh"
        sx={{ borderRadius: 2, backgroundColor: "rgba(145,158,171,0.12)" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 4,
          }}
        >
          <img width="80px" src={logo} />
        </Box>
        <Box sx={{ pl: 14, pt: 2 }}>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            {parkingSpots?.slice(0, 2).map((parkingSpot) => (
              <ParkingSpot
                key={parkingSpot.id}
                number={parkingSpot.number}
                disabled={parkingSpot.unavailable}
                charger={parkingSpot.charger_available}
                available={checkAvailability(
                  availableParkingSpots,
                  parkingSpot.id
                )}
                selected={isParkingSpotSelected(parkingSpot)}
                onClick={() => handleSelect(parkingSpot)}
              />
            ))}
          </Box>
          <Box
            sx={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end" }}
          >
            {parkingSpots?.slice(2).map((parkingSpot) => (
              <ParkingSpot
                key={parkingSpot.id}
                number={parkingSpot.number}
                disabled={parkingSpot.unavailable}
                availableParkingSpots={availableParkingSpots}
                charger={parkingSpot.charger_available}
                available={checkAvailability(
                  availableParkingSpots,
                  parkingSpot.id
                )}
                selected={isParkingSpotSelected(parkingSpot)}
                onClick={() => handleSelect(parkingSpot)}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ParkingSpotOverview;
