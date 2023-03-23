import { useContext, useEffect } from "react";
import { UserContext } from "../App";

function useRequestExecutor(client, requestFn, callback) {
  const setUser = useContext(UserContext);
  useEffect(() => {
    requestFn()
      .then(callback)
      .catch((e) => {
        if (e === 401) {
          setUser(null);
        }
      });
  }, [client]);
}

export default useRequestExecutor;
