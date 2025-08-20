export const CountryLine = ({ country, setShowOne }) => {
  return (
    <p>
      {country.name.common}{" "}
      <button
        onClick={() => {
          setShowOne(country);
        }}
      >
        Show info
      </button>{" "}
    </p>
  );
};
