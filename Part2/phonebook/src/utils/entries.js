import axios from "axios";

const url = "http://localhost:3001/persons";

const getAll = () => axios.get(url).then((res) => res.data);

const getOne = (id) => axios.get(`${url}/${id}`);

const addEntry = (newEntry) => axios.post(url, newEntry);

const updateEntry = (id, updatedEntry) =>
  axios.put(`${url}/${id}`, updatedEntry);

const remove = (person) => {
  axios.delete(`${url}/${person.id}`);
};

export default { getAll, getOne, addEntry, updateEntry, remove };
