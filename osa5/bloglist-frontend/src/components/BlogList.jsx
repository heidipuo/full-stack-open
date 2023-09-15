import Blog from './Blog'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  return (
    <div>
      <h3>Bloglist</h3>
      <ul>
        {blogs
          .slice()
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <li className='blog' key={blog.id}>
              <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author} </Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default BlogList
