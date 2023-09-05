import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
    name: 'filter',
    initialState: 'ALL',
    reducers: {
        handleFilter(state, action) {
            console.log('filter', JSON.parse(JSON.stringify(state)))
            return action.payload === ''
            ? 'ALL'
            : action.payload
        }
    }
})


export const { handleFilter } = filterSlice.actions
export default filterSlice.reducer