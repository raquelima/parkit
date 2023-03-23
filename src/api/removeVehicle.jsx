import executeRequest from "./executeRequest";

const removeVehicle = async (client, id) => {
  return executeRequest(client, "vehicles", "removeVehicle", { id: id });
};

export default removeVehicle;
