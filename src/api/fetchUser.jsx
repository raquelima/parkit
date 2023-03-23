async function fetchUser(client) {
  if (client?.apis?.users) {
    const userId = JSON.parse(localStorage.getItem("user")).userId;
    try {
      const response = await client.apis.users.getUser({ id: userId });
      return {
        user: response.body,
        error: null,
        loading: false,
      };
    } catch (e) {
      return {
        user: null,
        error: `An error occurred: ${e.statusCode} - ${e.response?.statusText}`,
        loading: false,
      };
    }
  }
}

export default fetchUser;
