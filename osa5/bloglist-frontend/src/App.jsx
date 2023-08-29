import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'




const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  //const [blog, setBlog] = useState(null)


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
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
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

  const addBlog = async (event) => {
      event.preventDefault()
      const newBlog = {
        title: title,
        author: author,
        url: url
      }

      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
  }

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

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
    <button type="submit">logout</button>
    </form>
  )

  return (
    <div>

    {!user && loginForm()}
    {user && <div>
        <h2>blogs</h2>
        <p>{user.name} logged in {logoutForm()}</p>
         {blogForm()}
        <Blogs blogs={blogs} />
      </div>}
    
    
    </div>
  )
}

export default App