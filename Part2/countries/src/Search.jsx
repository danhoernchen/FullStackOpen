export const Search = ({ searchInput, setSearchInput }) => {
  function handleInput(el) {
    setSearchInput(el.target.value);
  }
  return (
    <div>
      <input type="text" value={searchInput} onChange={handleInput}></input>
    </div>
  );
};
