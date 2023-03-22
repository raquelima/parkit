import filterById from "../utils/filterById";

async function fetchUserReservations(client) {
  const userId = JSON.parse(localStorage.getItem("user")).userId;
  if (client?.apis?.reservations) {
    try {
      const response = await client.apis.reservations.listReservations();
      return {
        reservations: filterById(response.body.reservations, userId),
        error: null,
        loading: false,
      };
    } catch (e) {
      return {
        reservations: null,
        error: `An error occurred: ${e.statusCode} - ${e.response?.statusText}`,
        loading: false,
      };
    }
  }
}

export default fetchUserReservations;
