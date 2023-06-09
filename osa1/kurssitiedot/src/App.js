const Header = (props) => {
  console.log(props)
  return (
    <>
    <h1>{props.course}</h1>
    </>
  )

}

const Content = ({parts}) => {
  console.log(parts)
  return (
    <div>
      <Part name={parts[0].name} exercises={parts[0].exercises} />
      <Part name={parts[1].name} exercises={parts[1].exercises}/>
      <Part name={parts[2].name} exercises={parts[2].exercises}/>
    </div>
  )
}

const Part = (props) => {
  console.log(props)
  return (
     <div>
      <p>{props.name} {props.exercises} </p>
     </div>
  )
} 

const Total = (props) => {
  console.log(props)
  return (
    <>
    <p>Number of exercises {props.total[0].exercises + props.total[1].exercises + props.total[2].exercises}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { 
        name: 'Fundamentals of React', 
       exercises: 10 
     },
      { 
        name: 'Using props to pass data', 
        exercises: 6 
      },
      { 
        name: 'State of a component', 
        exercises: 14
       }
    ]
  }

  return (
    <div>
      <Header course={course.name} />     
      <Content parts={course.parts}/>
      <Total total={course.parts}/>
    </div>
  )
}

export default App