import Anecdotes from './components/AnecdoteList'
import Filter from './components/Filter'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <Filter/>  
      <Anecdotes/>
      <AnecdoteForm/>
    
    </div>
  )
}

export default App