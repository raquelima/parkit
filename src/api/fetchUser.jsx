import executeRequest from "./executeRequest";

/**
 * Fetches logged in user using specified client by reading the user ID from LocalStorage
 * @param {Object} client The API client
 * @returns {Promise<Object>} A promise that resolves to the response data from the API call.
 */
async function fetchUser(client) {
  const userId = JSON.parse(localStorage.getItem("user")).userId;
  return executeRequest(client, "users", "getUser", { id: userId });
}

export default fetchUser;
