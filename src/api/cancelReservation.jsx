const cancelReservation = async (client, id) => {
  if (client?.apis?.reservations) {
    try {
      const response = await client.apis.reservations.cancelReservation({
        id: id,
      });
      return {
        response: response,
        error: `An error occurred: ${e.statusCode} - ${e.response?.statusText}`,
        loading: false,
      };
    } catch (e) {
      return {
        response: null,
        error: `An error occurred: ${e.statusCode} - ${e.response?.statusText}`,
        loading: false,
      };
    }
  }
};

export default cancelReservation;
