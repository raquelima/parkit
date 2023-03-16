import React from "react";
import useCreateSwaggerClient from "./hooks/useCreateSwaggerClient.jsx";
import RouteContainer from "./components/RouteContainer";
import { useState } from "react";

export const SwaggerClientContext = React.createContext();

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const client = useCreateSwaggerClient(user);

  return (
    <SwaggerClientContext.Provider value={client}>
      <RouteContainer user={user} setUser={setUser} />
    </SwaggerClientContext.Provider>
  );
}

export default App;
