import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [notificationStyle, setNotificationStyle] = useState('')



  useEffect(() => {
    console.log('getting blogs...')
    blogService.getAll().then(blogs => {
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
      setMessage(`You added a new blog: ${returnedBlog.title} by ${returnedBlog.author}`)
      setNotificationStyle('success')
      setEmptyMessage()
    }catch (exception) {
      console.log('error', exception.response)
      if (exception.response.status === 400) {
        setMessage('Could not add a new blog. Blog title and url are required.')
        setNotificationStyle('error')
        setTimeout(() => {
          setMessage('')
        }, 9000)
      }
    }

  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setMessage('wrong username or password')
      setNotificationStyle('error')
      setTimeout(() => {
        setMessage('')
      }, 5000)

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
    const updatedBlogs = blogs.filter(blog => blog.id !== blogToDelete.id)
    setBlogs(updatedBlogs)
  }

  const setEmptyMessage = () => {
    setTimeout(() => {
      setMessage('')
    }, 2000)
  }

  const blogFormRef = useRef()

  const handleLikeChange = (blogObject) => {
    const updatedBlogs = blogs.map(blog => blog.id === blogObject.id ? blogObject : blog)
    setBlogs(updatedBlogs)
  }


  if (user === null) {
    return (
      <div>
        <Notification message={message} style={notificationStyle}/>
        <LoginForm username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}/>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={message} style={notificationStyle}/>

      <p style={{ marginBottom: 20 }}>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel='Add blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      <div>
        <h3>Bloglist</h3>
        <ul>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog
              key={blog.id}
              blog={blog} handleLikeChange={handleLikeChange}
              deleteBlog={deleteBlog}
              username={user.username}
            />
          )}
        </ul>
      </div>

    </div>
  )
}

export default App