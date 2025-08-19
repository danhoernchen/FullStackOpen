import { useEffect, useState } from "react";
import { NewPerson } from "./NewPerson";
import { Numbers } from "./Numbers";
import { Search } from "./Search";
import entriesUtil from "./utils/entries.js";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    entriesUtil.getAll().then((res) => setPersons(res));
  });
  const handleSearchInput = (el) => {
    setSearchInput(el.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <NewPerson persons={persons} />
      <Search searchInput={searchInput} handleSearchInput={handleSearchInput} />
      <Numbers persons={persons} searchInput={searchInput} />
    </div>
  );
};

export default App;
