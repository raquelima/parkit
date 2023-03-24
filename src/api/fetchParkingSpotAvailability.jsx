import format from "date-fns/format";
import executeRequest from "./executeRequest";

/**
 * Fetches available parking spots using specified client, date and full-/half-day specification
 * @param {Object} client The API client
 * @param {Object} date
 * @param {Boolean} halfDay
 * @param {Boolean} am
 * @returns {Promise<Object>} A promise that resolves to the response data from the API call.
 */
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
