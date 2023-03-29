import { createContext, useState } from "react";
import useCreateSwaggerClient from "./hooks/useCreateSwaggerClient.jsx";
import RouteContainer from "./components/RouteContainer";

export const SwaggerClientContext = createContext();
export const UserContext = createContext();

/**
 * This is a functional component that renders the main application UI and provides SwaggerClient and User context.
 * @returns {JSX.Element} - The App component wrapped in SwaggerClient and User context providers.
 */
function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const client = useCreateSwaggerClient(user);

  return (
    <SwaggerClientContext.Provider value={client}>
      <UserContext.Provider value={setUser}>
        <RouteContainer setUser={setUser} user={user} />
      </UserContext.Provider>
    </SwaggerClientContext.Provider>
  );
}

export default App;
