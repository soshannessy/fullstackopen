import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  return axios.get(baseUrl).then(response => response.data);
};

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
  return Promise.resolve(); // Return a resolved promise if the user cancels
};

export default { getAll, create, update, remove };
