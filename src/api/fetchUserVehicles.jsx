import filterByUserId from "../utils/filterByUserId";
import executeRequest from "./executeRequest";

/**
 * @description Fetches vehicles from logged in user using specified client by reading the user ID from LocalStorage
 * @param {Object} client
 * @returns {Promise<Object>} A promise that resolves to the response data from the API call.
 */
async function fetchUserVehicles(client) {
  const userId = JSON.parse(localStorage.getItem("user")).userId;
  const response = await executeRequest(client, "vehicles", "listVehicles");

  return filterByUserId(response?.vehicles, userId);
}

export default fetchUserVehicles;
