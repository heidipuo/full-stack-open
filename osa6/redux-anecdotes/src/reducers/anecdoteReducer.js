import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
  
const anecdoteSlice = createSlice({
  name: 'anecdotes', 
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      console.log('state before', JSON.parse(JSON.stringify(state)))
      console.log('action', JSON.parse(JSON.stringify(action)))
      state.push(action.payload)
      console.log('state after', JSON.parse(JSON.stringify(state)))
    },
    voteFor(state, action) {
      const votedAnecdote = action.payload
      return state.map(anec => anec.id !== votedAnecdote.id ? anec : votedAnecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }

})

export const { appendAnecdote, voteFor, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateAnecdote = ( content ) => {
  return async dispatch => {
    const updatedObj = {
      ...content,
      votes: content.votes+ 1
    }
    const updatedAnecdote = await anecdoteService.updateAnecdote(updatedObj)
    dispatch(voteFor(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer