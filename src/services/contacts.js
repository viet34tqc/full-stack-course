import axios from "axios";

const baseUrl = "http://localhost:3001/contacts";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data); // trả về 1 promises. Nếu promise này dùng then thì response.data sẽ là tham số truyền vào
};

const create = newObject => {
  const request = axios.post(baseUrl, newObject);
  return request.then(response => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data);
};

const del = id => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => response.data);
};

export default {
  getAll,
  create,
  update,
  del
};
