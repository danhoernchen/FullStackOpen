export const Average = ({ ratings }) => {
  const count = ratings.reduce((total, current) => total + current);
  const total = ratings[0] - ratings[2];
  const average = Math.round((total / count) * 100) / 100;
  return (
    <tr>
      <td>Average</td>
      <td>{isNaN(average) ? 0 : average}</td>
    </tr>
  );
};
