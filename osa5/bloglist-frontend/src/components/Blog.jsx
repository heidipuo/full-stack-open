import { useState } from 'react'

const Blog = ({ blog, handleLikeChange, deleteBlog, username }) => {
  const [likes, setLikes] = useState(blog.likes)
  const [blogInfoVisible, setBlogInfoVisible] = useState(false)

  const hideWhenVisible = { display: blogInfoVisible ? 'none' : '' }
  const showWhenVisible = { display: blogInfoVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setBlogInfoVisible(!blogInfoVisible)
  }
  const addALike = async (event) => {
    event.preventDefault()
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes + 1
    }
    handleLikeChange(updatedBlog, blog.id)
    setLikes(likes + 1)
  }

  const setBlogToDelete = () => {
    deleteBlog(blog)
  }

  //
  return (

    <div className='blog'>

      <div style={hideWhenVisible}>{blog.title} - {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>

      <div className='blogInfo' style={showWhenVisible}>
        <p>{blog.title} - {blog.author} <button onClick={toggleVisibility}>hide</button> </p>
        <p>{blog.url}</p>
        <p>{likes} <button onClick={addALike}>like</button></p>
        <p>{blog.user.username}</p>
        {username === blog.user.username && <button className='removeButton' onClick={setBlogToDelete}>remove</button>}

      </div>

    </div>

  )
}

export default Blog