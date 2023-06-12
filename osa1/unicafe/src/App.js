import { useState } from 'react'

const Button = (props) => {
  console.log(props.text)
  return (
    <button onClick={props.handleClick}>{props.text}</button>  
  )
}

const Statistics = (props) => {
  console.log(props)
  const all = props.good + props.bad + props.neutral
  const average = (props.good - props.bad) / all
  const positive = props.good / all * 100
  
  if (all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value={props.good}/>
            <StatisticLine text="neutral" value={props.neutral}/>
            <StatisticLine text="bad" value={props.bad} />
            <StatisticLine text="all" value={all} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={positive} text2="%"/>
         </tbody>
        </table>   
    </div>
  )
}

const StatisticLine = (props) => {
  console.log()
  return (
    
     <tr>
      <td>{props.text}</td>
      <td>{props.value} {props.text2}</td> 
     </tr>
    
  )
}

const App = () => {
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