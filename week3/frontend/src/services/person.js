import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/persons';

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error:", error);
    throw error;
  }
};

const create = async (newObject) => {
  try {
    const response = await axios.post(baseUrl, newObject);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error:", error);
    throw error;
  }
};

const update = async (id, newObject) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, newObject);
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error:", error);
    throw error;
  }
};

const remove = async (id) => {
  try {
    if (window.confirm("Do you want to delete this person?")) {
      const response = await axios.delete(`${baseUrl}/${id}`);
      return response.data;
    }
    return Promise.resolve();
  } catch (error) {
    // Handle error
    console.error("Error:", error);
    throw error;
  }
};

export default { getAll, create, update, remove };

