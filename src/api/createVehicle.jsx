import executeRequest from "./executeRequest";

async function createVehicle(client, ev, licensePlateNumber, make, model) {
  const userId = JSON.parse(localStorage.getItem("user")).userId;

  return executeRequest(
    client,
    "vehicles",
    "createVehicle",
    {},
    {
      requestBody: {
        user_id: userId,
        ev: ev,
        license_plate_number: licensePlateNumber,
        make: make,
        model: model,
      },
    }
  );
}

export default createVehicle;
