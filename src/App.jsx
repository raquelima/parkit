import { useEffect, useState } from "react";
import SwaggerClient from "swagger-client";
import spec from "@berufsbildung-basel/parkit-spec/api.yml";
import { developmentBaseUrl } from "../mock/conf.js";

function App() {
  const [serverMessage, setServerMessage] = useState(null);

  useEffect(() => {
    (async () => {
      // TODO provide client instance globally
      const client = await new SwaggerClient({
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

      client.apis.users
        .listUsers()
        .then((response) => {
          if (response?.ok) {
            setServerMessage(response.body?.users?.[0].email ?? "No results");
          }
        })
        .catch((e) => {
          setServerMessage(
            `An error occurred: ${e.statusCode} - ${e.response?.statusText}`
          );
        });
    })();
  }, []);

  return (
    <>
      <h1>Hello World</h1>
      {serverMessage && <p>{serverMessage}</p>}
    </>
  );
}

export default App;
