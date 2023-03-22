async function fetchParkingSpots(client) {
  if (client?.apis["parking-spots"]) {
    try {
      const response = await client.apis["parking-spots"].listParkingSpots();
      return {
        parkingSpots: response.body.parking_spots,
        error: null,
        loading: false,
      };
    } catch (e) {
      return {
        parkingSpots: null,
        error: `An error occurred: ${e.statusCode} - ${e.response?.statusText}`,
        loading: false,
      };
    }
  }
}

export default fetchParkingSpots;
