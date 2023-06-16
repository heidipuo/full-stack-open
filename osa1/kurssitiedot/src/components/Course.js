const Course = ({course}) => {
    console.log("course", {course})
    return(
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
    )
  }
  
  const Header = (props) => {
    console.log("header", props)
    return (
      <>
      <h1>{props.course}</h1>
      </>
    )
  
  }
  
  const Content = ({parts}) => {
    console.log("content", parts)
    return (
      <div>
        {parts.map(part => 
          <Part key={part.id} name={part.name} exercises={part.exercises}/>
        )}
      </div>
    )
  }
  
  const Part = (props) => {
    console.log("part", props)
    return (
       <div>
        <p>{props.name} {props.exercises} </p>
       </div>
    )
  } 
  
  const Total = ({parts}) => {
    console.log(parts)
    return (
      <>
        <p>
          Number of exercises {parts.reduce(function (sum, part) {
            return sum + part.exercises
          }, 0)}
        </p>
      </>
    )
  }
  
  export default Course