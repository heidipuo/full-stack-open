import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const Anecdotes = ({anecdotes}) => {
    const dispatch = useNotificationDispatch()

    const queryClient = useQueryClient()

    const updateAnecdoteMutation = useMutation(updateAnecdote, {
        onSuccess: (newAnecdote) => {
          queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
          dispatch({
            type: 'NOTIFICATE', 
            payload: `You voted for '${newAnecdote.content}'`})
        }
      })
        
      
      const handleVote = (anecdote) => {
        updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
        setTimeout(() => {
            dispatch({type: 'RESET_NOTIFICATION'})
          }, 5000)
    }
  
    return (
      <div>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div className='anecdote' key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
      </div>
  )
}

export default Anecdotes