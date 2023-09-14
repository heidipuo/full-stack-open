import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    removeBlog(state, action) {
      const blogs = state.filter((blog) => blog.id !== action.payload)
      return blogs
    },
    handleLike(state, action) {
      const blogs = state.map((blog) =>
        blog.id === action.payload.id ? action.payload : blog
      )
      return blogs
    },
  },
})

export const { setBlogs, appendBlog, removeBlog, handleLike } =
  blogSlice.actions

export const initialBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const addedBlog = await blogService.create(blog)
      dispatch(appendBlog(addedBlog))
    } catch (exception) {
      if (exception.response.status === 400) {
        dispatch(
          setNotification(
            'Could not add a blog. Blog title and url are required',
            9
          )
        )
      }
    }
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch(removeBlog(id))
  }
}

export const updateLikes = (blog) => {
  return async (dispatch) => {
    const response = await blogService.update(blog.id, blog)
    dispatch(handleLike(response))
  }
}

export default blogSlice.reducer
