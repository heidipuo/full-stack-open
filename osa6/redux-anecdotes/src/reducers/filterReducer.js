
const filterReducer = (state = 'ALL', action) => {
    console.log('state filter', state, action)
    switch (action.type) {
        case 'SET_FILTER':
         return action.payload === ''
            ? 'ALL'
            : action.payload
         default:
         return state
    }
}

export const handleFilter = filter => {
   return {
    type:'SET_FILTER',
    payload: filter
   }
}

export default filterReducer