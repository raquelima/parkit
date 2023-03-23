import filterById from "../utils/filterById";
import executeRequest from "./executeRequest";

async function fetchUserVehicles(client) {
  const userId = JSON.parse(localStorage.getItem("user")).userId;
  const response = await executeRequest(client, "vehicles", "listVehicles");

  return filterById(response?.vehicles, userId);
}

export default fetchUserVehicles;
