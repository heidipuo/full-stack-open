import { handleFilter } from "../reducers/anecdoteReducer"
import { useDispatch, useSelector } from 'react-redux'


const Filter = () => {
    const dispatch = useDispatch()
   
    const handleChange = (event) => {
     
        console.log(event.target.value)
        dispatch(handleFilter(event.target.value))
     
    }

    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter