import executeRequest from "./executeRequest";

/**
 * Cancels a reservation with the specified ID using the given client
 * @param {Object} client The API client
 * @param {string} reservationId
 * @returns {Promise<Object>} A promise that resolves to the response data from the API call.
 */
const cancelReservation = async (client, reservationId) => {
  return executeRequest(
    client,
    "reservations",
    "cancelReservation",
    {
      id: reservationId,
    },
    {}
  );
};

export default cancelReservation;
