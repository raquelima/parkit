import React from "react";
import { developmentBaseUrl } from "../mock/conf.js";
import SwaggerClient from "swagger-client";
import spec from "@berufsbildung-basel/parkit-spec/api.yml";

export const SwaggerClientContext = React.createContext();

function App() {
  
  const client = new SwaggerClient({
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
  });

  return (
    <SwaggerClientContext.Provider value={client}>
      <h1>Hello World</h1>
      {serverMessage && <p>{serverMessage}</p>}
    </SwaggerClientContext.Provider>
  );
}

export default App;
