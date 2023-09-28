import { useQuery } from "@apollo/client"
import { BOOKS_BY_GENRE } from "../queries"
import { useEffect, useState } from "react"

const Recommendations = (props) => {
   
    const [ books, setBooks ] = useState([])

    const result = useQuery(BOOKS_BY_GENRE, {
        skip: !props.show,
        variables: {genre: props.favoriteGenre}
      })

    useEffect(() => {
        if (result.data) {
        setBooks(result.data.allBooks) 
      } 
      }, [result.data])

    if(!props.show){
        return null
    }

    
     return (
        <div>
            <h2>recommendations</h2>
            Books in your favourite genre <b>{props.favoriteGenre}</b>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    )
    
}

export default Recommendations