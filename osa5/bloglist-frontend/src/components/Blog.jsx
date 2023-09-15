import { useState } from 'react'
import { deleteBlog, updateLikes } from '../reducers/blogReducer'
import { deleteBlogFromUser } from '../reducers/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
  useParams,
  useNavigate,
} from 'react-router-dom'

const Blog = () => {
  const loggedInUsername = useSelector((state) => state.login.username)
  const user = useSelector((state) =>
    state.users.find((user) => user.username === loggedInUsername)
  )

  const id = useParams().id
  const blog = useSelector(state => state.blogs).find(blog => blog.id === id)

  const dispatch = useDispatch()
  const navigate = useNavigate()

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
      dispatch(deleteBlogFromUser(blog.id, user))
      navigate('/')
    }
  }

  if(!blog){
    return null
  }

  return (
    <div>
      <h3>{blog.title} by {blog.author}</h3>
      <p> <a href={blog.url}>{blog.url}</a></p>
      <p>{blog.likes} likes <button onClick={addALike}>like</button></p>
      <p>Added by {blog.user.name}</p>
      {loggedInUsername === blog.user.username && (
        <button className="removeButton" onClick={setBlogToDelete}>
            remove
        </button>
      )}
    </div>
  )

}


export default Blog
