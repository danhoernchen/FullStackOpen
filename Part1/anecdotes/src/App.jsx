import { useState } from "react";
import { Button } from "./Button";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const randClick = () => {
    const randNum = Math.floor(Math.random() * anecdotes.length);
    setSelected(randNum);
  };
  const voteArray = new Array(anecdotes.length + 1).fill(0);
  const [votes, castVote] = useState(voteArray);
  const voteClick = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    castVote(newVotes);
  };
  const max = Math.max(...votes);
  return (
    <div>
      <div>{anecdotes[selected]}</div>
      <div>Has {votes[selected]} Votes</div>
      <div>
        <Button text="Random Anecdote" clickHandler={randClick} />
        <Button text="Vote for Anecdote" clickHandler={voteClick} />
      </div>
      <div>
        <h2>Anecdote with most votes</h2>
        <p>{anecdotes[votes.indexOf(max)]}</p>
      </div>
    </div>
  );
};

export default App;
