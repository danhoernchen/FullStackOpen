import axios from "axios";

const url = "http://localhost:3001/persons";

const getAll = () => {
  const all = axios.get(url);
  return all.then((res) => res.data);
};

const getOne = (id) => {
  const entry = axios.get(`${url}/${id}`);
  return entry.then((res) => res.data);
};

const addEntry = (newEntry) => {
  const entry = axios.post(url, newEntry);
  return entry.then((res) => res.data);
};

const updateEntry = (id, updatedEntry) => {
  const entry = axios.put(`${url}/${id}`, updatedEntry);
  return entry.then((res) => res.data);
};

const remove = (id) => {
  axios.delete(`${url}/${id}`);
};

export default { getAll, getOne, addEntry, updateEntry, remove };
