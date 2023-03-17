import { useEffect, useState } from "react";

const useFetchReservations = (client) => {
  const [reservations, setReservations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReservations = () => {
    if (client?.apis?.reservations) {
      (async () => {
        client.apis.reservations
          .listReservations()
          .then((response) => {
            setReservations(response.body.reservations);
            setLoading(false);
          })
          .catch((e) => {
            setError(
              `An error occurred: ${e.statusCode} - ${e.response?.statusText}`
            );
          });
      })();
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [client]);

  return { reservations, loading };
};

export default useFetchReservations;
