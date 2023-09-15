import Blog from './Blog'
import { useSelector } from 'react-redux'

const BlogList = () => {

  const user = useSelector((state) => state.login)
  const blogs = useSelector((state) => state.blogs)

  return (
    <div>
      <h3>Bloglist</h3>
      <ul>
        {blogs
          .slice()
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} username={user.username} />
          ))}
      </ul>
    </div>
  )
}

export default BlogList
