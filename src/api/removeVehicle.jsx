const removeVehicle = async (client, id) => {
  if (client?.apis?.vehicles) {
    try {
      const response = await client.apis.vehicles.removeVehicle({ id: id });
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

export default removeVehicle;
