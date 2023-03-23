import executeRequest from "./executeRequest";

async function fetchParkingSpots(client) {
  return executeRequest(client, "parking-spots", "listParkingSpots");
}

export default fetchParkingSpots;
