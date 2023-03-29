import executeRequest from "./executeRequest";

/**
 * Removes a vehicle with the specified vehicle ID using the given client
 * @async
 * @param {Object} client - The Swagger Client object
 * @param {string} vehicleId - The vehicle ID of the vehicle to be removed
 * @returns {Promise<Object>} A promise that resolves to the response data from the API call
 */
async function removeVehicle(client, vehicleId) {
  return executeRequest(client, "vehicles", "removeVehicle", { id: vehicleId });
}

export default removeVehicle;
