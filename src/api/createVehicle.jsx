import executeRequest from "./executeRequest";

/**
 * Creates a vehicle with the specified ev, license plate number, make and model using the given client
 * @async
 * @param {Object} client - The Swagger Client object
 * @param {boolean} ev - Is true when the vehicle to be created is eletric
 * @param {string} licensePlateNumber - The license plate number of the vehicle to be created
 * @param {string} make - The manufacture of the vehicle to be created
 * @param {string} model - The model of the vehicle to be created
 * @returns {Promise<Object>} A promise that resolves to the response data from the API call
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
