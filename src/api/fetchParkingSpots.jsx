import executeRequest from "./executeRequest";

/**
 * Fetches all parking spots using specified client
 * @async
 * @param {Object} client - The Swagger Client object
 * @returns {Promise<Object>} A promise that resolves to the response data from the API call.
 */
async function fetchParkingSpots(client) {
  return executeRequest(client, "parking-spots", "listParkingSpots");
}

export default fetchParkingSpots;
