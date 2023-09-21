import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql, useQuery} from '@apollo/client'

const AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

const App = () => {
  const [page, setPage] = useState('authors')

  const resultAuthor = useQuery(AUTHORS)
  console.log('res', resultAuthor)

if(resultAuthor.loading) {
  return <div>loading...</div>
}
return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} authors={resultAuthor.data.allAuthors}/>

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App