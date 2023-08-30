import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import LogoutForm from './components/LogoutForm'
import Togglable from './components/Toggable'
import blogService from './services/blogs'
import loginService from './services/login'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')
  const [notificationStyle, setNotificationStyle] = useState('')
  const [addBlogVisible, setAddBlogVisible] = useState(false)


  useEffect(() => {
    console.log('getting blogs...')
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = {
        title: title,
        author: author,
        url: url
      }

      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setMessage(`You added a new blog: ${returnedBlog.title} by ${returnedBlog.author}`)
      setNotificationStyle('success')
      setEmptyMessage()
    }catch (exception) {
      console.log('error', exception.response)
      if (exception.response.status === 400) {
        setMessage('Could not add a message. Blog title and url are required.')
        setNotificationStyle('error')
        setTimeout(() => {
          setMessage('')
        }, 9000)
      }
    }

    setTitle('')
    setAuthor('')
    setUrl('')
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

  const setEmptyMessage = () => {
    setTimeout(() => {
      setMessage('')
    }, 2000)
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
      <p>{user.name} logged in <LogoutForm handleLogout={handleLogout}/></p>
      <Togglable buttonLabel='Add blog'>
        <BlogForm addBlog={addBlog}
          title={title}
          author={author}
          url={url}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
        />
      </Togglable>
      <Blogs blogs={blogs} />
    </div>
  )
}

export default App