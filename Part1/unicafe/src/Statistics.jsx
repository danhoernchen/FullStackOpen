import { Rating } from "./Rating";
import { Average } from "./Average";
import { Positive } from "./Positive";
import { StatisticLine } from "./StatisticLine";
export const Statistics = ({ ratings }) => {
  const [good, neutral, bad] = ratings;
  return (
    <div>
      <h2>Statistics</h2>
      {!good && !neutral && !bad ? (
        "No Ratings yet"
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Ratings</th>
              </tr>
            </thead>
            <tbody>
              <StatisticLine type="rating" name="Good" total={good} />
              <StatisticLine type="rating" name="Neutral" total={neutral} />
              <StatisticLine type="rating" name="Bad" total={bad} />
            </tbody>
            <thead>
              <tr>
                <th>Average</th>
              </tr>
            </thead>
            <tbody>
              <StatisticLine type="average" ratings={ratings} />
            </tbody>
            <thead>
              <tr>
                <th>Postive</th>
              </tr>
            </thead>
            <tbody>
              <StatisticLine type="positive" ratings={ratings} />
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
