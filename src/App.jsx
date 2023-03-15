import React from "react";
import useCreateSwaggerClient from "./useCreateSwaggerClient.jsx";
import AppRoutes from "./AppRoutes.jsx";

export const SwaggerClientContext = React.createContext();

function App() {
  const client = useCreateSwaggerClient();

  return (
    <SwaggerClientContext.Provider value={client}>
      <AppRoutes/>
    </SwaggerClientContext.Provider>
  );
}

export default App;
