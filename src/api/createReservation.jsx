async function createReservation(
  client,
  parkingSpotId,
  userId,
  vehicleId,
  date,
  halfDay,
  am
) {
  if (client?.apis?.reservations) {
    try {
      const response = await client.apis.reservations.createReservation(
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
      console.log(response);
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
}

export default createReservation;
