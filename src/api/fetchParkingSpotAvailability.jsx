import format from "date-fns/format";
import executeRequest from "./executeRequest";

/**
 * Fetches available parking spots with specified date, half day, am using the given client
 * @async
 * @param {Object} client - The Swagger Client object
 * @param {Object} date - The date for which to check available parking spots
 * @param {boolean} halfDay - Whether availability should be checked for a half-day reservation (false for full-day)
 * @param {boolean} am - If halfDay is true, whether a reservation is intended ante- or post-meridian (morning or afternoon)
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
