import { Country } from "./Country";
import { CountryLine } from "./CountryLine";
import { useState } from "react";

export const Result = ({ countries, search }) => {
  const [showOne, setShowOne] = useState(null);
  console.log(showOne);
  function filterCountries() {
    return countries.filter((country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase())
    );
  }
  const filtered = filterCountries(countries);
  if (showOne === null) {
    if (filtered.length <= 0) {
      return <div>No Results</div>;
    } else if (filtered.length > 10) {
      return <div>Too many results, please narrow down</div>;
    } else if (filtered.length > 1 && filtered.length <= 10) {
      return (
        <div>
          {filtered.map((country) => (
            <CountryLine
              country={country}
              setShowOne={setShowOne}
              key={country.name.common}
            />
          ))}
        </div>
      );
    } else if (filtered.length === 1) {
      return (
        <div>
          <Country
            country={filtered[0]}
            showOne={showOne}
            setShowOne={setShowOne}
          />
        </div>
      );
    }
  } else if (showOne !== null) {
    return (
      <Country
        country={showOne}
        setShowOne={setShowOne}
        showOne={showOne}
      ></Country>
    );
  }
};
