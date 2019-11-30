import React, { useState } from "react";
import ReactDOM from "react-dom";

const Heading = ({ text }) => <h2>{text}</h2>;

const Statistic = ({ text, value }) => (
  <li>
    {text}: {value}
  </li>
);

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = parseFloat(total / 3);
  const positive = total ? (good * 100) / total + "%" : 0;

  if (total === 0) {
    return (
      <div>
        <Heading text="Statistics" />
        No feedback given
      </div>
    );
  }

  return (
    <div>
      <Heading text="Statistics" />
      <ul>
        <Statistic text="Good" value={good} />
        <Statistic text="Neutral" value={neutral} />
        <Statistic text="Bad" value={bad} />

        <Statistic text="Average" value={average} />
        <Statistic text="Positive" value={positive} />
      </ul>
    </div>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

const MostVoteAnecdots = ({ votes }) => {
  const index = votes.indexOf(Math.max(...votes));

  return (
    <div>
      <Heading text="Most votes" />
      {anecdotes[index]}
      <br />
      {votes[index]}
    </div>
  );
};

const Anecdotes = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(
    [...anecdotes].fill(0, 0, anecdotes.length)
  );
  const handleGetAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  };
  const handleVote = selected => {
    var newVotes = [...votes];
    newVotes[selected]++;
    setVotes(newVotes);
  };

  return (
    <div>
      <Heading text="Anecdotes" />
      {anecdotes[selected]}
      <br />
      has {votes[selected]} {votes[selected] > 1 ? "votes" : "vote"}
      <br />
      <Button onClick={() => handleVote(selected)} text="Vote" />
      <Button onClick={handleGetAnecdote} text="Next Anecdots" />
      <MostVoteAnecdots votes={votes} />
    </div>
  );
};

const App = props => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <Heading text="Give Feedback" />

      <Button onClick={handleGood} text="Good" />
      <Button onClick={handleNeutral} text="Neutral" />
      <Button onClick={handleBad} text="Bad" />

      <Statistics good={good} neutral={neutral} bad={bad} />

      <Anecdotes anecdotes={anecdotes} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
