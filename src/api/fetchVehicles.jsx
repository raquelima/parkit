async function fetchVehicles(client) {
  if (client?.apis?.vehicles) {
    try {
      const response = await client.apis.vehicles.listVehicles();
      console.log(response.body.vehicles);
      return {
        vehicles: response.body.vehicles,
        error: null,
        loading: false,
      };
    } catch (e) {
      return {
        vehicles: null,
        error: `An error occurred: ${e.statusCode} - ${e.response?.statusText}`,
        loading: false,
      };
    }
  }
}

export default fetchVehicles;
