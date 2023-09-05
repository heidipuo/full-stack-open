import { useEffect } from 'react'
import Anecdotes from './components/AnecdoteList'
import Filter from './components/Filter'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])

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