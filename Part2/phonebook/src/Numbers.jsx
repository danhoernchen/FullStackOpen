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
