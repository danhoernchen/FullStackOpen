export const Positive = ({ ratings }) => {
  const positive = ratings[0];
  const total = ratings.reduce((all, cur) => all + cur);
  const percent = Math.round(((positive * 100) / total) * 100) / 100;
  return (
    <div>
      <h3>Postive Reviews</h3>
      <p>{isNaN(percent) ? "No Ratings" : `${percent}%`}</p>
    </div>
  );
};
