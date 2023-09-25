import { useState } from "react"
import { EDIT_AUTHOR } from "../queries"
import { useMutation } from "@apollo/client"
import { ALL_AUTHORS } from "../queries"


const Authors = ({authors, show}) => {
  
    
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
 
  const [ changeBorn ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ {query: ALL_AUTHORS}]
  })
    
  const updateAuthor = (event) => {
        event.preventDefault()
        console.log(name, born)
    
        changeBorn({ variables: { name, born }})
    
        setName('')
        setBorn('')
  }

  const handleChange = (event) => {
    event.preventDefault()
    setName(event.target.value)
    console.log(name)
  
  }
   
 if (!show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
          <h2>Set birth year</h2>
          <form onSubmit={updateAuthor}>
            <select value={name} onChange={handleChange}>
              {authors.map((a) => (
                <option key={a.name} value={a.name}>{a.name}</option>
              ))}
            </select>
            <div>
              born
              <input 
                value={born}
                onChange={({ target }) => setBorn(Number(target.value))}/>
            </div>
            <button type="submit">update author</button>
          </form>
        </div>
      
    </div>
  )
}

export default Authors
