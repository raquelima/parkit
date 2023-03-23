import format from "date-fns/format";
import executeRequest from "./executeRequest";
//make api not deliver more than 2 weeks after
//also delivers parking spots that are set unavailable
async function fetchParkingSpotAvailability(client, date, halfDay, am) {
  return executeRequest(
    client,
    "parking-spots",
    "checkParkingSpotAvailability",
    {
      date: format(date, "yyyy-MM-dd"),
      //remove this from api spec
      vehicle_id: 123,
      half_day: halfDay,
      am: am,
    }
  );
}

export default fetchParkingSpotAvailability;
