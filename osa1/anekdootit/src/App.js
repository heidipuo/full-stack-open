import { useState } from 'react'

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>
  
const MostVoted = (props) => {
  console.log(props)
  return (
    <div>
      <h2>Anecdote with most votes</h2>
        <p>{props.mostVoted}</p>
        <p>has {props.voteCount} votes</p>
    </div>
  )
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(getRandomInt(anecdotes.length))
  const [points, setPoints] = useState (Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(0)

  const setRandomInt = () => {
    let anecdoteNum = getRandomInt(anecdotes.length)
    console.log("selected", selected, "anctdotnum", anecdoteNum)
    while (anecdoteNum === selected) {
      anecdoteNum = getRandomInt(anecdotes.length)
    } 
    setSelected(anecdoteNum)
  }

  const updatePoints = () => {
    const copy = [...points]
    copy[selected] += 1
    console.log("lista", copy)
    setPoints(copy)

    let biggest = points[mostVoted];
    let anecdoteNum = mostVoted;
    for (let i = 0; i < copy.length; i++) {
      if (copy[i] > biggest) {
        biggest = copy[i]
        anecdoteNum = i
      }
    }
    setMostVoted(anecdoteNum)
    console.log("most voted:", mostVoted)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has votes {points[selected]}</p>
      <Button handleClick={updatePoints} text="vote"/>
      <Button handleClick={setRandomInt} text="next anecdote"/>
      <MostVoted mostVoted={anecdotes[mostVoted]} voteCount={points[mostVoted]}/>
    </div>
  )
}

export default App