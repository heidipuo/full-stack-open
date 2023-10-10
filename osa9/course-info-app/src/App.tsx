import data from "./data"
import Header from "./components/Header"
import Content from "./components/Content";
import Total from "./components/Total";


const App = () => {
  const {courseName, courseParts} = data;

  const total: number = courseParts.reduce((acc, part) => acc + part.exerciseCount , 0)

  return (
    <div>
      <Header name={courseName}/>
      <Content courseParts={courseParts}/>
      
      <Total total={total}/>
    </div>

  );
};

export default App;