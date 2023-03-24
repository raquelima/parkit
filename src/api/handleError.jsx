function handleError(e) {
  switch (e.response.status) {
    case 400:
      throw Error(400);
    case 401:
      throw Error(401);
    case 500:
      throw Error(500);
    case 409:
      throw Error(409);
    default:
      throw e;
  }
}

export default handleError;
