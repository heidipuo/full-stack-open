import { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()

    dispatch(
      createBlog({
        title: title,
        author: author,
        url: url,
      })
    )
    dispatch(setNotification(`You added a new blog: ${title} by ${author}`, 5))

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
