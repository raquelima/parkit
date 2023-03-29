import handleError from "./handleError";

/**
 * Executes an API request with specified tag, operation, parameters, and options using the given client.
 * @async
 * @param {Object} client - The Swagger Client object
 * @param {string} tag - The Swagger tag corresponding to the API operation to be executed
 * @param {string} operation - The Swagger operation ID corresponding to the API operation to be executed.
 * @param {Object} parameters - The parameters required by the API operation to be executed.
 * @param {Object} options - Optional configuration options to be passed to the Swagger client when executing the API operation.
 * @returns {Promise<Object>} A promise that resolves to the response data from the API call.
 * @throws {Error} Throws an error if the API call fails with a non-successful status code.
 */
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
