/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggable'
import BlogList from './components/BlogList'
import UserInfo from './components/UserInfo'
import { initialBlogs } from './reducers/blogReducer'
import { handleLoggedInUser } from './reducers/loginReducer'
import { initialUsers } from './reducers/usersReducer'
import {
  BrowserRouter as Router, Link,
  Routes, Route
} from 'react-router-dom'


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

const UsersPage = () => {
  const users = useSelector(state => state.users)
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
          {users.map(user => (
            <tr key={user.id}>
              <th>{user.name}   </th>
              <th>{user.blogs.length}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const App = () => {

  const user = useSelector((state) => state.login)
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
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div className="container">
      <Router>
        <div>
          <Link to="/">home</Link>
          <Link to="/users">users</Link>
        </div>

        <h2>blogs</h2>
        <Notification />
        <UserInfo />

        <Routes>
          <Route path="/" element={<BlogPage/>}/>
          <Route path="/users" element={<UsersPage/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
