import entryUtil from "./utils/entries.js";

export const Entry = ({
  name,
  number,
  id,
  persons,
  setPersons,
  messageHandler,
}) => {
  console.log("render");
  function removeEntry() {
    if (confirm(`Do you really want to delete ${name}?`)) {
      entryUtil.remove(id);
      setPersons(persons.filter((person) => person.id !== id));
      messageHandler({ message: `${name} has been deleted`, type: "alert" });
    }
  }
  return (
    <div>
      {name} - {number}
      <button onClick={removeEntry}>Delete</button>
    </div>
  );
};
