import { useState, useEffect } from "react";
import SwaggerClient from "swagger-client";
import { developmentBaseUrl } from "../../mock/conf.js";
import spec from "@berufsbildung-basel/parkit-spec/api.yml";

/**
 * A custom React hook that creates a Swagger client using the provided user credentials
 * @param {Object} user - An object containing the logged in user's username, password and ID
 * @returns {Object} - The created Swagger client object or null if no user is provided.
 */
function useCreateSwaggerClient(user) {
  const [swaggerClient, setSwaggerClient] = useState(null);

  useEffect(() => {
    if (user) {
      new SwaggerClient({
        spec: {
          ...spec,
          servers: [
            { url: `${developmentBaseUrl}/api`, description: "Test server" },
          ],
        },
        requestInterceptor: (request) => {
          Object.keys(localStorage).forEach((key) => {
            if (key.startsWith("x-test-")) {
              request.headers[key] = localStorage.getItem(key);
            }
          });
          request.headers["authorization"] = `Basic ${btoa(
            user.username + ":" + user.password
          )}`;
          return request;
        },
      }).then((client) => setSwaggerClient(client));
    }
  }, [user]);

  return swaggerClient;
}

export default useCreateSwaggerClient;
