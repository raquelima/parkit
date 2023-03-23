import filterById from "../utils/filterById";
import executeRequest from "./executeRequest";

async function fetchUserReservations(client) {
  const userId = JSON.parse(localStorage.getItem("user")).userId;

  const response = await executeRequest(
    client,
    "reservations",
    "listReservations"
  );
  return filterById(response?.reservations, userId);
}

export default fetchUserReservations;
