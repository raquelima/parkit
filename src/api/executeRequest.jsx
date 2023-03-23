import handleError from "./errorHandler";

async function executeRequest(client, tag, operation, parameters, options) {
  if (client?.apis?.[tag]) {
    try {
      const response = await client.apis[tag][operation](parameters, options);

      return response.body;
    } catch (e) {
      return {
        response: null,
        error: `An error occurred: ${e.statusCode} - ${e.response?.statusText}`,
      };
    }
  }
}

export default executeRequest;
