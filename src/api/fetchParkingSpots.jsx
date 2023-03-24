import executeRequest from "./executeRequest";

/**
 * @description Fetches all parking spots using specified client
 * @param {Object} client
 * @returns {Promise<Object>} A promise that resolves to the response data from the API call.
 */
async function fetchParkingSpots(client) {
  return executeRequest(client, "parking-spots", "listParkingSpots");
}

export default fetchParkingSpots;
