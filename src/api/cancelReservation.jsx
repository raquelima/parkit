import executeRequest from "./executeRequest";

const cancelReservation = async (client, id) => {
  return executeRequest(
    client,
    "reservations",
    "cancelReservation",
    {
      id: id,
    },
    {}
  );
};

export default cancelReservation;
