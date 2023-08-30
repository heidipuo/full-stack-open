import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const [likes, setLikes] = useState(blog.likes)
  const [blogInfoVisible, setBlogInfoVisible] = useState(false)

  const hideWhenVisible = { display: blogInfoVisible ? 'none' : '' }
  const showWhenVisible = { display: blogInfoVisible ? '' : 'none' }

  const toggleVisibility = () => {
    setBlogInfoVisible(!blogInfoVisible)
  }
  const addALike = async () => {

    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: likes + 1
    }
    const response = await blogService.update(blog.id, updatedBlog )
    console.log('update', response)
    setLikes(likes + 1)
  }

  return (<div className='blog'>
    <div style={hideWhenVisible}>{blog.title} - {blog.author}
      <button onClick={toggleVisibility}>view</button>
    </div>
    <div style={showWhenVisible}>
      <p>{blog.title} - {blog.author} <button onClick={toggleVisibility}>hide</button> </p>
      <p>{blog.url}</p>
      <p>{likes} <button onClick={addALike}>like</button></p>
      <p>{blog.user.username}</p>
    </div>
  </div>
  )
}

export default Blog