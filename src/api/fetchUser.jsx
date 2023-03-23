import executeRequest from "./executeRequest";

async function fetchUser(client) {
  const userId = JSON.parse(localStorage.getItem("user")).userId;
  return executeRequest(client, "users", "getUser", { id: userId });
}

export default fetchUser;
