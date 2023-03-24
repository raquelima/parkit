import handleError from "./handleError";

/**
 * Executes an API request using specified client, tag, operation, parameters, and options.
 * @param {Object} client The API client
 * @param {string} tag
 * @param {string} operation
 * @param {Object} parameters
 * @param {Object} options
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
