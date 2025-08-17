export const Positive = ({ ratings }) => {
  const positive = ratings[0];
  const total = ratings.reduce((all, cur) => all + cur);
  const percent = Math.round(((positive * 100) / total) * 100) / 100;
  return (
    <tr>
      <td>Postive Reviews</td>
      <td>{isNaN(percent) ? "No Ratings" : `${percent}%`}</td>
    </tr>
  );
};
