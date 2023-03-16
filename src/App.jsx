import React from "react";
import useCreateSwaggerClient from "./hooks/useCreateSwaggerClient.jsx";
import AppContainer from "./components/AppContainer";
import { useState } from "react";

export const SwaggerClientContext = React.createContext();

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const client = useCreateSwaggerClient(user);

  return (
    <SwaggerClientContext.Provider value={client}>
      <AppContainer user={user} setUser={setUser} />
    </SwaggerClientContext.Provider>
  );
}

export default App;
