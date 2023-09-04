import Anecdotes from './components/AnecdoteList'
import Filter from './components/Filter'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter/>  
      <Anecdotes/>
      <AnecdoteForm/>
    
    </div>
  )
}

export default App