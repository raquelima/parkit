import executeRequest from "./executeRequest";

/**
 * Fetches all reservations
 * @async
 * @param {Object} client - The Swagger Client object
 * @returns {Promise<Object>} A promise that resolves to the response data from the API call.
 */
async function fetchAllReservations(client) {
  const response = await executeRequest(
    client,
    "reservations",
    "listReservations"
  );
  return response?.reservations;
}

export default fetchAllReservations;
