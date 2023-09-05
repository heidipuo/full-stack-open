import { useDispatch, useSelector } from 'react-redux'
import { updateAnecdote } from "../reducers/anecdoteReducer"
import { notificateVoting, resetNotification } from '../reducers/notificationReducer'


const Anecdote = ({anecdote, handleClick}) => {
    return (
         <div className='anecdote' key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
    )
}

const Anecdotes = () => {
  
    const anecdotes = useSelector(state => {
      if (state.filter === 'ALL') {
        return state.anecdotes
      }else {
        return state.anecdotes.filter(anec => {
          return anec.content.toLowerCase().includes(state.filter)})
      }
    })
    
      const dispatch = useDispatch()


    const vote = (anecdote) => {
        console.log('vote', anecdote)
        const votedAnecdote = anecdotes.filter(anec => anec.id === anecdote.id)[0]
        dispatch(updateAnecdote(votedAnecdote))
        dispatch(notificateVoting(votedAnecdote))
        setTimeout(() => {
          dispatch(resetNotification())
        }, 5000)
        
      }

    return (
    <div>
 
    {[...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote =>
        <Anecdote 
            key={anecdote.id} 
            anecdote={anecdote}
            handleClick={() => vote(anecdote)}

            />
    )}
    </div>
)
}


export default Anecdotes