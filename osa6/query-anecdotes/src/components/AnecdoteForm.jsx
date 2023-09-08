import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()

  const queryClient = useQueryClient()

  const newMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries('anecdotes')
      
      dispatch({
        type: 'NOTIFICATE', 
        payload: `You added '${newAnecdote.content}'`
      })
    },
    onError: (error) => {
      dispatch({
        type: 'NOTIFICATE', 
        payload: error.response.data.error
      })
    } 
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newMutation.mutate({content, votes: 0})
    
    setTimeout(() => {
      dispatch({type: 'RESET_NOTIFICATION'})
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
