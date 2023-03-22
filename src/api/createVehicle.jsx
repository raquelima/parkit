async function createVehicle(client, ev, licensePlateNumber, make, model) {
  if (client?.apis?.vehicles) {
    const userId = JSON.parse(localStorage.getItem("user")).userId;
    try {
      const response = await client.apis.vehicles.createVehicle(
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
      return {
        response: response.statusText,
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

export default createVehicle;
