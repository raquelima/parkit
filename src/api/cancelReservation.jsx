import executeRequest from "./executeRequest";

/**
 * Cancels a reservation with the specified reservation ID using the given client
 * @async
 * @param {Object} client - The Swagger Client object
 * @param {string} reservationId - The reservation ID of the reservation to be cancelled
 * @returns {Promise<Object>} A promise that resolves to the response data from the API call
 */
async function cancelReservation(client, reservationId) {
  return executeRequest(
    client,
    "reservations",
    "cancelReservation",
    {
      id: reservationId,
    },
    {}
  );
}

export default cancelReservation;
