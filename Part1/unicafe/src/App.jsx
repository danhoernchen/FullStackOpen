import { useState } from "react";
import { Button } from "./Button";
import { Average } from "./Average";
import { Positive } from "./Positive";
import { Statistics } from "./Statistics";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const ratings = [good, neutral, bad];

  const handleClick = (caller) => {
    const rating = caller.currentTarget.id;
    switch (rating) {
      case "Good":
        setGood(good + 1);
        break;
      case "Neutral":
        setNeutral(neutral + 1);
        break;
      case "Bad":
        setBad(bad + 1);
        break;
      default:
        console.log("Uh-oh", caller);
    }
  };

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button text="Good" clickHandler={handleClick} />
      <Button text="Neutral" clickHandler={handleClick} />
      <Button text="Bad" clickHandler={handleClick} />
      <Statistics ratings={ratings} />
      <Average ratings={ratings} />
      <Positive ratings={ratings} />
    </div>
  );
};

export default App;
