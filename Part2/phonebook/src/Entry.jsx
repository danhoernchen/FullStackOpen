import entryUtil from "./utils/entries.js";

export const Entry = ({ person }) => {
  function removeEntry(el) {
    if (confirm(`Do you really want to delete ${person.name}?`)) {
      entryUtil.remove(person);
    }
  }
  return (
    <div key={person.name}>
      {person.name} - {person.number}
      <button onClick={removeEntry} id={person.id}>
        Delete
      </button>
    </div>
  );
};
