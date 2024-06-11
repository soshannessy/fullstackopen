import axios from 'axios';
const baseUrl = '/api/persons';

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  return axios.post(baseUrl, newObject).then(response => response.data);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data);
};

const remove = id => {
  if (window.confirm('Do you want to delete this person?')) {
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data);
  }
  return Promise.resolve();
};

export default { getAll, create, update, remove };
