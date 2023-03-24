import executeRequest from "./executeRequest";

/**
 * @description Creates a vehicle with the specified, client, ev, license plate number, make and model.
 * @param {Object} client
 * @param {Boolean} ev
 * @param {string} licensePlateNumber
 * @param {string} make
 * @param {string} model
 * @returns {Promise<Object>} A promise that resolves to the response data from the API call.
 */
async function createVehicle(client, ev, licensePlateNumber, make, model) {
  const userId = JSON.parse(localStorage.getItem("user")).userId;

  return executeRequest(
    client,
    "vehicles",
    "createVehicle",
    {},
    {
      requestBody: {
        user_id: userId,
        ev: ev,
        license_plate_number: licensePlateNumber,
        make: make,
        model: model,
      },
    }
  );
}

export default createVehicle;
