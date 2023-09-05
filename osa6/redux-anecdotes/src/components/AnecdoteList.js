import { useDispatch, useSelector } from 'react-redux'
import { voteFor } from "../reducers/anecdoteReducer"
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


    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteFor(id))
        const votedAnecdote = anecdotes.filter(anec => anec.id === id)[0].content
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
            handleClick={() => vote(anecdote.id)}

            />
    )}
    </div>
)
}


export default Anecdotes