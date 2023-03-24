/**
 * @description Filters an array of objects by a specified user ID.
 * @param {Array} array
 * @param {string} userId
 * @returns {Array} An array of objects with the specified user ID.
 */
function filterByUserId(array, userId) {
  return array?.filter((obj) => obj.user_id === userId);
}

export default filterByUserId;
