async function fetchReservations(client) {
  if (client?.apis?.reservations) {
    try {
      const response = await client.apis.reservations.listReservations();
      return {
        reservations: response.body.reservations,
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

export default fetchReservations;
