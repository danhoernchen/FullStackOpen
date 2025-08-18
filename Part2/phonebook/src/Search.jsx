export const Search = ({ searchInput, handleSearchInput }) => {
  return (
    <div>
      <h3>Search</h3>
      <div>
        <input value={searchInput} onChange={handleSearchInput} />
      </div>
    </div>
  );
};
