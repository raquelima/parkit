import { useEffect, useState } from "react";

const useFetchReservations = (client) => {
  const [reservations, setReservations] = useState(null);

  const fetchReservations = () => {
    if (client?.apis?.reservations) {
      (async () => {
        client.apis.reservations
          .listReservations()
          .then((response) => {
            Promise.all(
              response.body.reservations.map((element) => {
                return client.apis["parking-spots"]
                  .getParkingSpot({ id: element.parking_spot_id })
                  .then((response) => {
                    console.log(response);
                  });
              })
            ).then(() => {
              setReservations(response.body.reservations);
            });
          })
          .catch((e) => {
            setServerMessage(
              `An error occurred: ${e.statusCode} - ${e.response?.statusText}`
            );
          });
      })();
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [client]);

  return { reservations };
};

export default useFetchReservations;
