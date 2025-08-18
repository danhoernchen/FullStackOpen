import { useState } from "react";

const App = () => {
  const initialPersons = [
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ];
  const [persons, setPersons] = useState(initialPersons);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const handleSubmit = (el) => {
    el.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const alreadyExisting = persons.filter((person) => person.name === newName);
    if (alreadyExisting.length > 0) {
      alert(`${newName} is already in phonebook!`);
    } else {
      setPersons(persons.concat(newPerson));
    }
  };
  const handleNameInput = (el) => {
    setNewName(el.target.value);
  };
  const handleNumberInput = (el) => {
    setNewNumber(el.target.value);
  };
  const handleSearchInput = (el) => {
    setSearchInput(el.target.value);
  };

  const filterPersons = () => {
    const result = persons.filter((person) =>
      person.name.toLowerCase().startsWith(searchInput.toLowerCase())
    );
    return result;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Search</h3>
      <div>
        <input value={searchInput} onChange={handleSearchInput} />
      </div>
      <h3>Add New Person</h3>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameInput} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      {searchInput.length > 0 ? (
        filterPersons().length > 0 ? (
          filterPersons().map((person) => (
            <div key={person.name}>
              {person.name} - {person.number}
            </div>
          ))
        ) : (
          <div>No Results</div>
        )
      ) : (
        persons.map((person) => (
          <div key={person.name}>
            {person.name} - {person.number}
          </div>
        ))
      )}
    </div>
  );
};

export default App;
