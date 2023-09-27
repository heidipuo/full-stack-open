import { useQuery } from "@apollo/client"
import { BOOKS_BY_GENRE } from "../queries"
import { useState, useEffect } from "react"

const Books = (props) => {
  const [ genre, setGenre ] = useState('')
  const [ genres, setGenres ] = useState([])
  const [books, setBooks ] =useState(props.books)
  
  const result = useQuery(BOOKS_BY_GENRE, {
    skip: !props.show,
    variables: {genre}
  })

  useEffect(() => {
    if (result.data) {
    setBooks(result.data.allBooks)
    const genreList = [...new Set(props.books.map(book => book.genres).flat())]
    setGenres(genreList)}
  }, [result.data])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <form >
        filter by genre:
      <select value={genre} onChange={(event) => setGenre(event.target.value)}>
        <option value='' >all genres</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>{genre}</option>
        ))}
      </select>
      </form>

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

export default Books
