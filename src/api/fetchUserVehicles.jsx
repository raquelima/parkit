import filterByUserId from "../utils/filterByUserId";
import executeRequest from "./executeRequest";

/**
 * Fetches vehicles from logged in user using specified client by reading the user ID from LocalStorage
 * @async
 * @param {Object} client - The Swagger Client object
 * @returns {Promise<Object>} A promise that resolves to the response data from the API call.
 */
async function fetchUserVehicles(client) {
  const userId = JSON.parse(localStorage.getItem("user")).userId;

  const response = await executeRequest(client, "vehicles", "listVehicles");

  return filterByUserId(response?.vehicles, userId);
}

export default fetchUserVehicles;
