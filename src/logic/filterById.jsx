const userId = JSON.parse(localStorage.getItem("user")).userId;

function filterById(array) {
  return array?.filter(obj => obj.userId === userId);
}

export default filterById;
