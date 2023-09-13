import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    console.log('getting blogs...')
    blogService.getAll().then((blogs) => {
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      dispatch(
        setNotification(
          `You added a new blog: ${returnedBlog.title} by ${returnedBlog.author}`,
          5
        )
      )
    } catch (exception) {
      console.log('error', exception.response)
      if (exception.response.status === 400) {
        dispatch(
          setNotification(
            'Could not add a new blog. Blog title and url are required.',
            9
          )
        )
      }
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 5))
    }
    setUsername('')
    setPassword('')
  }

  const handleLogout = (event) => {
    event.preventDefault()
    console.log('logging out', user.username)

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const deleteBlog = async (blogToDelete) => {
    await blogService.deleteBlog(blogToDelete.id)
    const updatedBlogs = blogs.filter((blog) => blog.id !== blogToDelete.id)
    setBlogs(updatedBlogs)
  }

  const blogFormRef = useRef()

  const handleLikeChange = async (blogObject, id) => {
    const upDatedBlog = await blogService.update(id, blogObject)
    const updatedBlogs = blogs.map((blog) =>
      blog.id === upDatedBlog.id ? upDatedBlog : blog
    )
    setBlogs(updatedBlogs)
  }

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
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
        <BlogForm createBlog={addBlog} />
      </Togglable>

      <div>
        <h3>Bloglist</h3>
        <ul>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleLikeChange={handleLikeChange}
                deleteBlog={deleteBlog}
                username={user.username}
              />
            ))}
        </ul>
      </div>
    </div>
  )
}

export default App
