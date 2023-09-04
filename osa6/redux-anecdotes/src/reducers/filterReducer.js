
const filterReducer = (state = [], action) => {
    console.log('state filter', state, action)
}

export const handleFilter = (filter) => {
   return {
    type:'SET_FILTER',
    payload: filter
   }
}

export default filterReducer