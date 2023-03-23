import format from "date-fns/format";
//make api not deliver more than 2 weeks after
//also delivers parking spots that are set unavailable
async function fetchParkingSpotAvailability(client, date, halfDay, am) {
  if (client?.apis["parking-spots"]) {
    try {
      const response = await client.apis[
        "parking-spots"
      ].checkParkingSpotAvailability({
        date: format(date, "yyyy-MM-dd"),
        //remove this from api spec
        vehicle_id: 123,
        half_day: halfDay,
        am: am,
      });
      const filterAvailable = response.body.available_parking_spots.filter(
        (parkingSpot) => !parkingSpot.unavailable
      );
      return {
        availableParkingSpots: filterAvailable,
        error: null,
        loading: false,
      };
    } catch (e) {
      return {
        availableParkingSpots: null,
        error: `An error occurred: ${e.statusCode} - ${e.response?.statusText}`,
        loading: false,
      };
    }
  }
}

export default fetchParkingSpotAvailability;
