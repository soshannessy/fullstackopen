import { useState } from 'react';

const StatisticLine = ({text, value}) => {
  return(
  <tr>
    <td>{text}:</td>
    <td>{value}</td>
  </tr>
  )
}

const Statistics = ({good, neutral, bad, allClicks}) => {
  if (allClicks.length === 0) {
    return (
      <div>
        No feedback given
      </div>
    );
  }

  const total = good + neutral + bad;
  const average = total ? (good - bad) / total : 0;
  const positivePercentage = total ? (good / total) * 100 : 0;

  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="Total" value={total} />
        <StatisticLine text="Average" value={average} />
        <StatisticLine text="Positive Percentage" value={positivePercentage} />
      </tbody>
    </table>
  );
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleGoodClick = () => {
    setAll(allClicks.concat('G'));
    setGood(good + 1);
  }

  const handleNeutralClick = () => {
    setAll(allClicks.concat('N'));
    setNeutral(neutral + 1);
  }

  const handleBadClick = () => {
    setAll(allClicks.concat('B'));
    setBad(bad + 1);
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h2>statistics</h2>
      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad} 
        allClicks={allClicks} 
      />
    </div>
  );
}

export default App;