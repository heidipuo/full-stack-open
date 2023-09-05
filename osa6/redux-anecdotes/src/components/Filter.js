import { handleFilter } from "../reducers/filterReducer"
import { useDispatch } from 'react-redux'


const Filter = () => {
    const dispatch = useDispatch()
   
    const handleChange = (event) => {
        dispatch(handleFilter(event.target.value.toLowerCase()))
     
    }

    const style = {
      marginBottom: 10
    }
    
    return (
      <div style={style}>
        filter <input name="filter" onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter