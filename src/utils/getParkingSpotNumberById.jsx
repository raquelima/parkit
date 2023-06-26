/**
 * Filters the parking spots array with the given parking spot ID, returning the number of the parking spot
 * @param {string} id - The parking spot ID to filter the array with
 * @returns {number} The parking spot number
 */
function getParkingSpotNumberById(parkingSpotArray, id) {
  return parkingSpotArray
    ?.filter((parkingSpot) => parkingSpot.id === id)
    .map((parkingSpot) => {
      return parkingSpot.number;
    });
}
export default getParkingSpotNumberById;
