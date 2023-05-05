import { Box, Alert, Typography } from "@mui/material";
import ParkingSpot from "../components/ParkingSpot";
import logo from "../assets/adobeLogoLarge.png";

/**
 * A functional component that renders the parking spots
 * @param {Array} parkingSpots - An array with all parking spot objects
 * @param {Array} availableParkingSpots - An array with all available parking spot objects
 * @param {Object} selectedParkingSpot - The selected parking spot object
 * @param {Function} setSelectedParkingSpot - A function that sets the value of selectedParkingSpot
 * @param {Function} setOpenPanel - A function that sets the value of openPanel
 * @returns {JSX.Element} The ParkingSpotOverview component
 */
function ParkingSpotOverview({
  parkingSpots,
  availableParkingSpots,
  selectedParkingSpot,
  setSelectedParkingSpot,
  setOpenPanel,
}) {
  /**
   * Handles selection of parking spots and unselects parking spot if clicked when selected
   * @param {Object} parkingSpot - The selected parking spot object
   */
  const handleSelect = (parkingSpot) => {
    if (parkingSpot?.id == selectedParkingSpot?.id) {
      setSelectedParkingSpot(null);
      setOpenPanel(false);
    } else {
      setSelectedParkingSpot(parkingSpot);
      setOpenPanel(true);
    }
  };
  /**
   * Checks if parkingSpot object is selected
   * @param {Object} parkingSpot - A parking spot object
   * @returns {boolean} Boolean flag indicating whether parking spot is selected
   */
  const isParkingSpotSelected = (parkingSpot) =>
    selectedParkingSpot?.id === parkingSpot?.id;

  /**
   * Checks whether the parking spot ID is in the available parking spots array. Returns true if the ID was found meaning it is available
   * @param {Array} availableParkingSpotsArray - An array of available parking spots
   * @param {string} parkingSpotId - A parking spot id
   * @returns {boolean} Boolean flag indicating whether parking spot is available
   */
  const isParkingSpotAvailable = (
    availableParkingSpotsArray,
    parkingSpotId
  ) => {
    return availableParkingSpotsArray?.some(
      (availableParkingSpot) => availableParkingSpot.id == parkingSpotId
    );
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight={{ xs: "35vh", sm: "35vh", md: "65vh", lg: "65vh" }}
      mt={{ xs: 0, sm: 0, md: 5, lg: 5 }}
      sx={{
        border: 2,
        borderColor: "rgba(112,112,112,0.14)",
        borderRadius: 2,
      }}
    >
      <Box sx={{ borderRadius: 2, backgroundColor: "rgba(145,158,171,0.12)" }}>
        <Box
          pt={{ xs: 2, sm: 2, md: 5, lg: 5 }}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box width={{ xs: 120, sm: 120, md: 200, lg: 200 }}>
            <img width="100%" src={logo} />
          </Box>
        </Box>
        {parkingSpots ? (
          <Box>
            <Box
              px={{ xs: 0, sm: 0, md: 15, lg: 15 }}
              py={{ xs: 2, sm: 2, md: 9, lg: 9 }}
            >
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                {parkingSpots?.slice(0, 2).map((parkingSpot) => (
                  <ParkingSpot
                    key={parkingSpot.id}
                    number={parkingSpot.number}
                    disabled={parkingSpot.unavailable}
                    charger={parkingSpot.charger_available}
                    available={isParkingSpotAvailable(
                      availableParkingSpots,
                      parkingSpot.id
                    )}
                    selected={isParkingSpotSelected(parkingSpot)}
                    onClick={() => handleSelect(parkingSpot)}
                  />
                ))}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "flex-end",
                }}
              >
                {parkingSpots?.slice(2).map((parkingSpot) => (
                  <ParkingSpot
                    key={parkingSpot.id}
                    number={parkingSpot.number}
                    disabled={parkingSpot.unavailable}
                    availableParkingSpots={availableParkingSpots}
                    charger={parkingSpot.charger_available}
                    available={isParkingSpotAvailable(
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
        ) : (
          <Alert sx={{ mt: 3 }} severity="info">
            No parking spots were found
          </Alert>
        )}
      </Box>
    </Box>
  );
}

export default ParkingSpotOverview;
