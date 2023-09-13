import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

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
      console.log(state, 'act', action)
      const blogs = state.filter((blog) => blog.id !== action.payload)
      return blogs
    },
  },
})

export const { setBlogs, appendBlog, removeBlog } = blogSlice.actions

export const initialBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    const res = await blogService.deleteBlog(id)
    dispatch(removeBlog(id))
  }
}

export default blogSlice.reducer
