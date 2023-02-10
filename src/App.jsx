import React, { useState, useEffect } from "react";
import useCreateSwaggerClient from "./useCreateSwaggerClient.jsx";

export const SwaggerClientContext = React.createContext();

function App() {
  const client = useCreateSwaggerClient();
  const [users, setUsers] = useState(null);
  const [serverMessage, setServerMessage] = useState(null);

  useEffect(() => {
    if (client?.apis?.users) {
      (async () => {
        client.apis.users
          .listUsers()
          .then((response) => {
            if (response?.ok) {
              setUsers(response.body.users);
            }
          })
          .catch((e) => {
            setServerMessage(
              `An error occurred: ${e.statusCode} - ${e.response?.statusText}`
            );
          });
      })();
    }
  }, [client]);

  return (
    <SwaggerClientContext.Provider value={client}>
      <h1>Hello, </h1>
      {serverMessage ? (
        <p>{serverMessage}</p>
      ) : (
        users &&
        users.map((user) => {
          return <span key={user.id}>{user.username}</span>;
        })
      )}
    </SwaggerClientContext.Provider>
  );
}

export default App;
