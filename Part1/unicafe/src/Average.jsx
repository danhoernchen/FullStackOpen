export const Average = ({ ratings }) => {
  const count = ratings.reduce((total, current) => total + current);
  const total = ratings[0] - ratings[2];
  const average = Math.round((total / count) * 100) / 100;
  return (
    <div>
      {" "}
      <h3>Average</h3> <p>{isNaN(average) ? 0 : average}</p>
    </div>
  );
};
