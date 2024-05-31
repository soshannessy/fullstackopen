import { useState } from 'react'

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

function getMaxOfArray(numArray) {
  let max = numArray[0];
  for (let i = 1; i < numArray.length; i++) {
    if (numArray[i] > max) {
      max = numArray[i];
    }
  }
  return max;
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
);

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(0)

  const handleRandomGen = () => {
    const random = getRandomInt(0,anecdotes.length - 1)
    setSelected(random)
  }

  const handleVote = (quote) => {
    const newVotes = [...votes];
    newVotes[quote] += 1;
    setVotes(newVotes);
  }

  const maxVotes = getMaxOfArray(votes);
  console.log(maxVotes)
  const maxVotesIndex = votes.indexOf(maxVotes);
  console.log(maxVotesIndex)

  return (
    <div>
      <h2>Anecdote of the Day</h2>
      <p>{anecdotes[selected]}</p>
      <Button handleClick={() => handleVote(selected)} text='Vote'/>
      <Button handleClick={handleRandomGen} text='Next Anecdote'/>
      <h2>Anecdote with the most votes</h2>
      <p>{anecdotes[maxVotesIndex]}</p>
    </div>
  )
}

export default App