import axios from "axios";

const baseUrl = "/api/notes";

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data); // trả về 1 promises. Nếu promise này dùng then thì response.data sẽ là tham số truyền vào
};

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  };

  // await trả về kết quả
  // Nếu không có await thì trả về post như bình thường
  // The keyword await makes JavaScript wait until that promise settles and returns its result.
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data);
};

export default {
  getAll,
  create,
  update,
  setToken
};
