function filterById(array, userId) {
  return array?.filter((obj) => obj.userId === userId);
}

export default filterById;
