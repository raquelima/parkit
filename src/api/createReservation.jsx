import executeRequest from "./executeRequest";

/**
 * Creates a reservation with the specified parking spot ID, user ID, vehicle ID, date, halfDay and am using the given client
 * @async
 * @param {Object} client - The Swagger Client object
 * @param {string} parkingSpotId - Identifies the parking spot to be reserved
 * @param {string} userId - Identifies the user creating the reservation
 * @param {string} vehicleId - Identifies the vehicle (owned by the reservation user) that is intended to be on the reserved parking spot during the time of the reservation
 * @param {Object} date - The date on which this reservation is effective
 * @param {boolean} halfDay - Is true when the reservation's duration is half-day
 * @param {boolean} am - Is true when the reservation is a half-day reservation and the half day is in the first half of the day
 * @returns {Promise<Object>} A promise that resolves to the response data from the API call
 */
async function createReservation(
  client,
  parkingSpotId,
  userId,
  vehicleId,
  date,
  halfDay,
  am
) {
  return executeRequest(
    client,
    "reservations",
    "createReservation",
    {},
    {
      requestBody: {
        parking_spot_id: parkingSpotId,
        user_id: userId,
        vehicle_id: vehicleId,
        date: date.toString(),
        half_day: halfDay,
        am: am,
      },
    }
  );
}

export default createReservation;
