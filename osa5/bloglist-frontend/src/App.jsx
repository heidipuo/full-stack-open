import { useEffect, useRef } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggable'
import { useDispatch } from 'react-redux'
import BlogList from './components/BlogList'
import { initialBlogs } from './reducers/blogReducer'
import { setUser, handleLoggedInUser } from './reducers/loginReducer'
import { useSelector } from 'react-redux'

const App = () => {
  const user = useSelector((state) => state.login)

  const dispatch = useDispatch()

  useEffect(() => {
    console.log('getting blogs...')
    dispatch(initialBlogs())
  }, [])

  useEffect(() => {
    dispatch(handleLoggedInUser())
  }, [])

  const handleLogout = (event) => {
    event.preventDefault()
    console.log('logging out', user.username)

    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
  }

  const blogFormRef = useRef()

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div className="container">
      <h2>blogs</h2>

      <Notification />

      <p style={{ marginBottom: 20 }}>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="Add blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>

      <div>
        <h3>Bloglist</h3>
        <BlogList user={user} />
      </div>
    </div>
  )
}

export default App
