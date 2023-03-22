import filterById from "../utils/filterById";

async function fetchUserVehicles(client) {
  const userId = JSON.parse(localStorage.getItem("user")).userId;
  if (client?.apis?.vehicles) {
    try {
      const response = await client.apis.vehicles.listVehicles();
      return {
        vehicles: filterById(response.body.vehicles, userId),
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

export default fetchUserVehicles;
