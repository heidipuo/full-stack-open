import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient, useQuery} from '@apollo/client'
import { ALL_AUTHORS } from './queries'
import { ALL_BOOKS } from './queries'
import BirthYear from './components/BirthYear'



const App = () => {
  const [page, setPage] = useState('login')
  const [token, setToken] = useState(null)
  const resultAuthor = useQuery(ALL_AUTHORS)
  const resultBooks = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  const logout = () => {
    setToken(null) 
    localStorage.clear()
    client.resetStore()
    setPage('login')
  }

if(resultAuthor.loading || resultBooks.loading) {
  return <div>loading...</div>
}

if (!token) {
  return (
    <div>
      <button onClick={() => setPage('authors')}>authors</button>
      <button onClick={() => setPage('books')}>books</button>
      <button onClick={() => setPage('login')}>login</button>
      
      <Authors show={page === 'authors'} authors={resultAuthor.data.allAuthors}/>

      <Books show={page === 'books'} books={resultBooks.data.allBooks} />
      
      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage}/>
   
    </div>
  )
}

return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === 'authors'} authors={resultAuthor.data.allAuthors}/>
      <BirthYear show={page === 'authors'} authors={resultAuthor.data.allAuthors}/>
 
      <Books show={page === 'books'} books={resultBooks.data.allBooks} />

      <NewBook show={page === 'add'} />

    </div>
  )
}

export default App
