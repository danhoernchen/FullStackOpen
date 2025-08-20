import { useEffect, useState } from "react";
import { NewPerson } from "./NewPerson";
import { Numbers } from "./Numbers";
import { Search } from "./Search";
import { MessageDisplay } from "./MessageDisplay.jsx";
import entriesUtil from "./utils/entries.js";
import "./styles.css";

const App = () => {
  console.log("render");
  const [message, setMessage] = useState({ message: null });
  const [persons, setPersons] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    entriesUtil.getAll().then((res) => setPersons(res));
  }, []);

  const handleSearchInput = (el) => {
    setSearchInput(el.target.value);
  };
  const messageHandler = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage({ message: null });
    }, 5000);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <MessageDisplay message={message} />
      <NewPerson
        persons={persons}
        messageHandler={messageHandler}
        setPersons={setPersons}
      />
      <Search searchInput={searchInput} handleSearchInput={handleSearchInput} />
      <Numbers
        persons={persons}
        searchInput={searchInput}
        setPersons={setPersons}
        messageHandler={messageHandler}
      />
    </div>
  );
};

export default App;
