import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = (props) => {
  const blogs = useSelector((state) => {
    return state.blogs
  })

  return (
    <ul>
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} username={props.user.username} />
        ))}
    </ul>
  )
}

export default BlogList
