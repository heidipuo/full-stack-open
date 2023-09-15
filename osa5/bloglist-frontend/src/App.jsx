/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggable'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import UserInfo from './components/UserInfo'
import { initialBlogs } from './reducers/blogReducer'
import { handleLoggedInUser } from './reducers/loginReducer'
import { initialUsers } from './reducers/usersReducer'
import {
  BrowserRouter as Router,
  Link,
  Routes,
  Route,
  useParams,
} from 'react-router-dom'
import { updateLikes } from './reducers/blogReducer'
import { deleteBlog } from './reducers/blogReducer'
import { deleteBlogFromUser } from './reducers/usersReducer'

const BlogPage = () => {
  const blogFormRef = useRef()
  return (
    <div>
      <Togglable buttonLabel="Add blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <BlogList />
    </div>
  )
}

const UsersPage = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <th>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </th>
              <th>{user.blogs.length}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const User = ({ users }) => {
  const id = useParams().id
  const user = users.find((user) => user.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}


const App = () => {
  const user = useSelector((state) => state.login)
  const users = useSelector((state) => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('getting blogs...')
    dispatch(initialBlogs())

    console.log('getting users...')
    dispatch(initialUsers())

    dispatch(handleLoggedInUser())
  }, [])

  if (user === null) {
    return (
      <div className="container">
        <Notification />
        <LoginForm />
      </div>
    )
  }

  /*
.navi li a {
  display: block;
  padding: 8px;
  
}
*/
  return (
    <div className="container">
      <Router>
        <ul className='navi'>
          <li><Link className='child' to="/">home</Link></li>
          <li><Link className='child' to="/users">users</Link></li>
          <li style={{float: 'right'}}><UserInfo className='child' /></li>
        </ul>
        
        <h2>Blogs</h2>
        <Notification />
        <Routes>
          <Route path="/" element={<BlogPage />} />
          <Route path="/users" element={<UsersPage users={users} />} />
          <Route path="/users/:id" element={<User users={users} />} />
          <Route path="/blogs/:id" element={<Blog />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
