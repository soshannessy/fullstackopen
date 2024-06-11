import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/persons';

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then(response => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then(response => response.data);
};

const remove = (id) => {
  if (window.confirm('Do you want to delete this person?')) {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data);
  }
  return Promise.resolve();
};

export default { getAll, create, update, remove };

