import { Weather } from "./Weather";
export const Country = ({ country, showOne, setShowOne }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>
        <strong>Capital: {country.capital[0]}</strong>
      </p>
      <p>Area: {country.area}</p>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h2>Languages</h2>
      <ul>
        {Object.entries(country.languages).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
      <Weather city={country.capital[0]} />
      {showOne !== null ? (
        <button onClick={() => setShowOne(null)}>Back</button>
      ) : (
        ""
      )}
    </div>
  );
};
