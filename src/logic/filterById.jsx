function filterById(array, userId) {
  return array?.filter((obj) => obj.user_id === userId);
}

export default filterById;
