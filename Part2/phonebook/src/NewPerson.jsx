import { useState } from "react";
import entriesUtil from "./utils/entries.js";

export const NewPerson = ({ persons }) => {
  const handleSubmit = (el) => {
    el.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const alreadyExisting = persons.filter((person) => person.name === newName);
    if (alreadyExisting.length > 0) {
      if (alreadyExisting[0].number === newNumber)
        alert(`${newName} is already in phonebook!`);
      else {
        if (confirm(`Do you want to update the number for ${newName}?`)) {
          entriesUtil.updateEntry(alreadyExisting[0].id, newPerson);
        }
      }
    } else {
      entriesUtil.addEntry(newPerson);
    }
  };
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const handleNameInput = (el) => {
    setNewName(el.target.value);
  };
  const handleNumberInput = (el) => {
    setNewNumber(el.target.value);
  };
  return (
    <div>
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
    </div>
  );
};
