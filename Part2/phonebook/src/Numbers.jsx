import { Entry } from "./Entry";

export const Numbers = ({
  persons,
  searchInput,
  setPersons,
  messageHandler,
}) => {
  const filterPersons = () => {
    const result = persons.filter((person) =>
      person.name.toLowerCase().startsWith(searchInput.toLowerCase())
    );
    return result;
  };

  const createEntry = (person) => {
    return (
      <Entry
        name={person.name}
        number={person.number}
        key={person.name}
        id={person.id}
        persons={persons}
        setPersons={setPersons}
        messageHandler={messageHandler}
      />
    );
  };
  return (
    <div>
      <h3>Numbers</h3>
      {searchInput.length > 0 ? (
        filterPersons().length > 0 ? (
          filterPersons().map((person) => createEntry(person))
        ) : (
          <div>No Results</div>
        )
      ) : (
        persons.map((person) => createEntry(person))
      )}
    </div>
  );
};
