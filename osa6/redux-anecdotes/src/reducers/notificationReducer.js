import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        notificateAdding(state, action) {
            return `You added anecdote "${action.payload}"`      
        },
        resetNotification(state, action) {
            return ''
        },
        notificateVoting(state, action) {
            const anecdote = action.payload
            return `You voted for anecdote "${anecdote}"`
        }
    }
})


export const { notificateAdding, notificateVoting, resetNotification } = notificationSlice.actions
export default notificationSlice.reducer