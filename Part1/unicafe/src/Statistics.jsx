import { Rating } from "./Rating";
export const Statistics = ({ ratings }) => {
  const [good, neutral, bad] = ratings;
  return (
    <div>
      <h2>Statistics</h2>
      {!good && !neutral && !bad ? (
        "No Ratings yet"
      ) : (
        <div>
          <Rating name="Good" total={good} />
          <Rating name="Neutral" total={neutral} />
          <Rating name="Bad" total={bad} />
        </div>
      )}
    </div>
  );
};
