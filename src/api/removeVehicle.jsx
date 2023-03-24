import executeRequest from "./executeRequest";

/**
 * @describe Removes a vehicle with the specified ID using the given client
 * @param {Object} client
 * @param {*} vehicleId
 * @returns {Promise<Object>} A promise that resolves to the response data from the API call.
 */
const removeVehicle = async (client, vehicleId) => {
  return executeRequest(client, "vehicles", "removeVehicle", { id: vehicleId });
};

export default removeVehicle;
