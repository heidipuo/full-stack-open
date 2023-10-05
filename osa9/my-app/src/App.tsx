interface CoursePart {
  name: string,
  exerciseCount: number
}

const Header = ({ name }: {name: string}) => {
  return (
  <h1>{name}</h1>
  )
}

const Content = ({ parts }: {parts: CoursePart[]}) => {
  return (
    <div>
      {parts.map(part => <p key={parts.indexOf(part)}>{part.name} {part.exerciseCount}</p> )}
    </div>
  )
}

const Total = ({total}: {total: number}) => {
  return (
    <div>Number of exercises {total}</div>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  const total: number = courseParts.reduce((acc, part) => acc + part.exerciseCount , 0)

  return (
    <div>
      <Header name={courseName}/>
      <Content parts={courseParts}/>
      <Total total={total}/>
    </div>

  );
};

export default App;