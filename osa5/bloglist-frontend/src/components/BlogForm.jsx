import { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { addBlogToUser } from '../reducers/usersReducer'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const loggedInUsername = useSelector((state) => state.login.username)
  const user = useSelector((state) =>
    state.users.find((user) => user.username === loggedInUsername)
  )

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: title,
      author: author,
      url: url,
    }

    dispatch(createBlog(newBlog))
    dispatch(setNotification(`You added a new blog: ${title} by ${author}`, 5))
    dispatch(addBlogToUser(newBlog, user))

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create a blog</h2>
      <form onSubmit={addBlog}>
        <ul>
          <li>
            title
            <input
              className="title"
              type="text"
              value={title}
              name="Title"
              onChange={(event) => setTitle(event.target.value)}
            />
          </li>
          <li>
            author
            <input
              className="author"
              type="text"
              value={author}
              name="Author"
              onChange={(event) => setAuthor(event.target.value)}
            />
          </li>
          <li>
            url
            <input
              className="url"
              type="text"
              value={url}
              name="url"
              onChange={(event) => setUrl(event.target.value)}
            />
          </li>
        </ul>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
