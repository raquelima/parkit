import { format } from "date-fns";

const now = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

function filterUpcomingReservations(reservations) {
  return reservations?.filter(
    (reservation) => reservation.start_time > now && !reservation.cancelled
  );
}

export default filterUpcomingReservations;
