import { useState } from 'react'
import { deleteBlog, updateLikes } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const Blog = ({ blog, username }) => {
  const [blogInfoVisible, setBlogInfoVisible] = useState(false)

  const hideWhenVisible = { display: blogInfoVisible ? 'none' : '' }
  const showWhenVisible = { display: blogInfoVisible ? '' : 'none' }

  const dispatch = useDispatch()

  const toggleVisibility = () => {
    setBlogInfoVisible(!blogInfoVisible)
  }
  const addALike = async (event) => {
    event.preventDefault()
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id,
    }
    dispatch(updateLikes(updatedBlog))
  }

  const setBlogToDelete = () => {
    if (
      window.confirm(`Do you want to delete "${blog.title}?" by ${blog.author}`)
    ) {
      dispatch(deleteBlog(blog.id))
    }
  }

  return (
    <div className="blog">
      <div style={hideWhenVisible}>
        {blog.title} - {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>

      <div className="blogInfo" style={showWhenVisible}>
        <p>
          {blog.title} - {blog.author}{' '}
          <button onClick={toggleVisibility}>hide</button>{' '}
        </p>
        <p>{blog.url}</p>
        <p>
          {blog.likes} <button onClick={addALike}>like</button>
        </p>
        <p>{blog.user.username}</p>
        {username === blog.user.username && (
          <button className="removeButton" onClick={setBlogToDelete}>
            remove
          </button>
        )}
      </div>
    </div>
  )
}

export default Blog
