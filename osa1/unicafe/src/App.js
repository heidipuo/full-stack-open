import { useState } from 'react'

const Button = (props) => {
  console.log(props)
  return (
    <button onClick={props.handleClick}>{props.text}</button>  
  )
}

const Statistics = (props) => {
  console.log(props)
  const all = (props.good + props.bad + props.neutral)
  const average = ((props.good - props.bad) / all) 
  const positive = (props.good / all * 100)
  
  return (
    <div>
      <h1>statistics</h1>
        <p>good {props.good}</p>
        <p>neutral {props.neutral}</p>
        <p>bad {props.bad}</p>
        <p>all {all}</p>
        <p>average {average}</p>
        <p>positive {positive} %</p>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
     
    </div>
  )
}

export default App