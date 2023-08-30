import Blog from './Blog'


const Blogs = ({ blogs }) => {
  console.log('blogs', blogs)
  return (
    <div>
      <h3>Bloglist</h3>
      <p>{blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </p>
    </div>
  )
}



export default Blogs
