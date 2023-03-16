import React from "react";
import useCreateSwaggerClient from "./hooks/useCreateSwaggerClient.jsx";
import AppContainer from "./components/AppContainer";

export const SwaggerClientContext = React.createContext();

function App() {
  const client = useCreateSwaggerClient();

  return (
    <SwaggerClientContext.Provider value={client}>
      <AppContainer />
    </SwaggerClientContext.Provider>
  );
}

export default App;
