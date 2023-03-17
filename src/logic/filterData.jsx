const userId = JSON.parse(localStorage.getItem("user")).userId;

function filterData(data) {
  data?.filter((element) => {
    return element.user_id == userId;
  });
}

export default filterData;
