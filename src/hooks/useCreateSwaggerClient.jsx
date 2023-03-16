import { useState, useEffect } from "react";
import SwaggerClient from "swagger-client";
import { developmentBaseUrl } from "../../mock/conf.js";
import spec from "@berufsbildung-basel/parkit-spec/api.yml";

function useCreateSwaggerClient() {
  const [swaggerClient, setSwaggerClient] = useState(null);

  useEffect(() => {
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
          "test@adobe.com:testPassword"
        )}`;
        return request;
      },
    }).then((client) => setSwaggerClient(client));
  }, []);

  return swaggerClient;
}

export default useCreateSwaggerClient;
