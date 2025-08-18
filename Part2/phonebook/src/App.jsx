import { useEffect, useState } from "react";
import { NewPerson } from "./NewPerson";
import { Numbers } from "./Numbers";
import { Search } from "./Search";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((res) => setPersons(res.data));
  });
  const handleSearchInput = (el) => {
    setSearchInput(el.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <NewPerson persons={persons} setPersons={setPersons} />
      <Search searchInput={searchInput} handleSearchInput={handleSearchInput} />
      <Numbers persons={persons} searchInput={searchInput} />
    </div>
  );
};

export default App;
