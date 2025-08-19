import { Entry } from "./Entry";

export const Numbers = ({ persons, searchInput }) => {
  const filterPersons = () => {
    const result = persons.filter((person) =>
      person.name.toLowerCase().startsWith(searchInput.toLowerCase())
    );
    return result;
  };
  return (
    <div>
      <h3>Numbers</h3>
      {searchInput.length > 0 ? (
        filterPersons().length > 0 ? (
          filterPersons().map((person) => <Entry person={person} />)
        ) : (
          <div>No Results</div>
        )
      ) : (
        persons.map((person) => <Entry person={person} />)
      )}
    </div>
  );
};
