function handleError(e) {
  switch (e.response.status) {
    case 401:
      throw Error(401);
    case 500:
      throw Error(500);
    case 409:
      throw Error(409);
    default:
      break;
  }
}

export default handleError;
