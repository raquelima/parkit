//check if it actually delivers available ones and not all
async function fetchParkingSpotsToday(client) {
  if (client?.apis["parking-spots"]) {
    try {
      const response = await client.apis[
        "parking-spots"
      ].listParkingSpotsToday();
      return {
        parkingSpots: response.body.parkingSpots,
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

export default fetchParkingSpotsToday;
