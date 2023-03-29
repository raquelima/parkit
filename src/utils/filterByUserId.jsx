/**
 * Filters an array of objects by a specified user ID.
 * @param {Array} array - The array to be filtered.
 * @param {string} userId - The user ID to filter the array with.
 * @returns {Array} An array of objects filtered by the specified user ID.
 */
function filterByUserId(array, userId) {
  return array?.filter((obj) => obj.user_id === userId);
}

export default filterByUserId;
