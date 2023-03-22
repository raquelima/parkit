import format from "date-fns/format";

//make api not deliver more than 2 weeks after
async function fetchParkingSpotAvailability(client, date, time) {
  let halfDay = time === "AM" || time === "PM" ? true : false;
  let am = time === "AM" ? true : false;

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
      console.log(response);
      return {
        availableParkingSpots: response.body.available_parking_spots,
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
