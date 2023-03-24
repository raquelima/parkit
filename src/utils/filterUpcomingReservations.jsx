import { format } from "date-fns";

/**
 * @description Filters an array of reservations and filters the upcoming ones
 * @param {Array} reservations
 * @returns {Array} An array of upcoming reservations
 */
function filterUpcomingReservations(reservations) {
  const now = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
  return reservations?.filter(
    (reservation) => reservation.start_time > now && !reservation.cancelled
  );
}

export default filterUpcomingReservations;
