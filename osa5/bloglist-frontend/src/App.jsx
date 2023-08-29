import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
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
      console.log('errpr', exception.response)
      if (exception.response.status === 400) {
      setMessage('Could not add a message. blog title and url are required.')
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

  const loginForm = () => (
    <><h2>Log in to application</h2>
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form></>      
  )

 

  const blogForm = () => (
    <div>
    <h2>Create a blog</h2>
    <form onSubmit={addBlog}>
     <ul> 
      <li>
        title
        <input
        type='text'
        value={title}
        name="Title"
        onChange={({target}) => setTitle(target.value)}
      />
      </li>
      <li>author
      <input
        type='text'
        value={author}
        name="Author"
        onChange={({target}) => setAuthor(target.value)}
      />
      </li>
      <li>url
      <input
        type='text'
        value={url}
        name="url"
        onChange={({target}) => setUrl(target.value)}
      />
      </li>
      </ul>
      <button type="submit">create</button>
    </form>
     </div> 
  )
  const LogoutForm = () => (
    <form onSubmit={handleLogout}>
    <button type="submit">logout</button>
    </form>
  )
 

  const setEmptyMessage = () => {
    setTimeout(() => {
      setMessage('')
    }, 2000)
  }

  return (
    <div>

    <Notification message={message} style={notificationStyle}/>

    {!user && loginForm()}
    {user && <div>
        <h2>blogs</h2>
        <p>{user.name} logged in {LogoutForm()}</p>
         {blogForm()}
        <Blogs blogs={blogs} />
      </div>}
    
    
    </div>
  )
}

export default App