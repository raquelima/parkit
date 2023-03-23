import executeRequest from "./executeRequest";

async function createReservation(
  client,
  parkingSpotId,
  userId,
  vehicleId,
  date,
  halfDay,
  am
) {
  return executeRequest(
    client,
    "reservations",
    "createReservation",
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
}

export default createReservation;
