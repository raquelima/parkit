import filterByUserId from "../utils/filterByUserId";
import executeRequest from "./executeRequest";

/**
 * Fetches reservations from logged in user using specified client by reading the user ID from LocalStorage
 * @async
 * @param {Object} client - The Swagger Client object
 * @returns {Promise<Object>} A promise that resolves to the response data from the API call.
 */
async function fetchUserReservations(client) {
  const userId = JSON.parse(localStorage.getItem("user")).userId;

  const response = await executeRequest(
    client,
    "reservations",
    "listReservations"
  );
  return filterByUserId(response?.reservations, userId);
}

export default fetchUserReservations;
