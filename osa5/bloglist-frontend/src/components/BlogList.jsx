import Blog from './Blog'
import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
//import { deleteBlog } from '../reducers/blogReducer'

const BlogList = (props) => {
  const blogs = useSelector((state) => {
    return state.blogs
  })

  const handleLikeChange = async (blogObject, id) => {
    const upDatedBlog = await blogService.update(id, blogObject)
    const updatedBlogs = blogs.map((blog) =>
      blog.id === upDatedBlog.id ? upDatedBlog : blog
    )
    //setBlogs(updatedBlogs)
  }

  return (
    <ul>
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLikeChange={handleLikeChange}
            username={props.user.username}
          />
        ))}
    </ul>
  )
}

export default BlogList
