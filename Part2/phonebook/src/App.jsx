import { useState } from "react";
import { NewPerson } from "./NewPerson";
import { Numbers } from "./Numbers";
import { Search } from "./Search";

const App = () => {
  const initialPersons = [
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ];
  const [persons, setPersons] = useState(initialPersons);
  const [searchInput, setSearchInput] = useState("");

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
