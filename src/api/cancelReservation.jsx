import executeRequest from "./executeRequest";

/**
 * @description Cancels a reservation with the specified ID using the given client
 * @param {Object} client
 * @param {string} reservationId
 * @returns {Promise<Object>}
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
