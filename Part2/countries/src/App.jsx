import { useState, useEffect } from "react";
import getCountries from "./utils/getCountries";
import { Search } from "./Search";
import { Result } from "./Result";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    getCountries.getAll().then((res) => setCountries(res));
  }, []);
  return (
    <div>
      <Search setSearchInput={setSearchInput} searchInput={searchInput} />
      <Result countries={countries} search={searchInput} />
    </div>
  );
};

export default App;
