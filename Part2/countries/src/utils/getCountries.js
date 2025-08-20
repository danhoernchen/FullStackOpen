import axios from "axios";

const url = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = () => {
  const data = axios.get(`${url}/all`);
  return data.then((res) => res.data);
};

export default { getAll };
