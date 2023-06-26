/**
 * Filters the user array with the given user ID, returning the number of the parking spotn
 * @param {string} id - The parking spot ID to filter the array with
 * @returns {number} The parking spot number
 */
function getUserById(parkingSpotArray, id) {
  return parkingSpotArray
    ?.filter((parkingSpot) => parkingSpot.id === id)
    .map((parkingSpot) => {
      return parkingSpot.number;
    });
}
export default getUserById;
