import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import BirthYear from './components/BirthYear'
import Recommendations from './components/Recommendations'
import { useApolloClient, useQuery, useSubscription} from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, ME } from './queries'



const App = () => {
  const [page, setPage] = useState('login')
  const [token, setToken] = useState(null)
  const resultAuthor = useQuery(ALL_AUTHORS)
  const resultBooks = useQuery(ALL_BOOKS)
  const resultUser = useQuery(ME)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      window.alert(`New book ${addedBook.title} added to library`)
      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        }
      })
    }
  })

  useEffect(() => {
    setToken(localStorage.getItem("library-user-token") || null)
    resultUser.startPolling(500)
    setTimeout(() => {
      resultUser.stopPolling()
    }, 3000)
  }, [token])


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
        <button onClick={() => setPage('recommendations')}>recommendations</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors show={page === 'authors'} authors={resultAuthor.data.allAuthors}/>
      <BirthYear show={page === 'authors'} authors={resultAuthor.data.allAuthors}/>
 
      <Books show={page === 'books'} books={resultBooks.data.allBooks} />

      <NewBook show={page === 'add'} />

      <Recommendations 
        show={page === 'recommendations'} 
        favoriteGenre={resultUser.data.me ? resultUser.data.me.favoriteGenre : ''} 
        books={resultBooks.data.allBooks} />

    </div>
  )
}

export default App
