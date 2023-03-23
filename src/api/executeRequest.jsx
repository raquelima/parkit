import handleError from "./handleError";

async function executeRequest(client, tag, operation, parameters, options) {
  if (client?.apis?.[tag]) {
    try {
      const response = await client.apis[tag][operation](parameters, options);

      return response.body;
    } catch (e) {
      handleError(e);
    }
  }
}

export default executeRequest;
