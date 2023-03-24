import filterByUserId from "../utils/filterByUserId";
import executeRequest from "./executeRequest";

/**
 * @description Fetches reservations from logged in user using specified client by reading the user ID from LocalStorage
 * @param {Object} client
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
