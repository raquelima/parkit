import executeRequest from "./executeRequest";

/**
 * Fetches logged in user using specified client by reading the user ID from LocalStorage
 * @async
 * @param {Object} client - The Swagger Client object
 * @returns {Promise<Object>} A promise that resolves to the response data from the API call.
 */
async function fetchUser(client) {
  const userId = "dGVzdEBhZG9iZS5jb20=";

  return executeRequest(client, "users", "getUser", { id: userId });
}

export default fetchUser;
