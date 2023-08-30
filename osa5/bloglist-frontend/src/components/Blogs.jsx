
const Blogs = (props) => {
  console.log('blogs', props)
  return (
    <div>
      <h3>Bloglist</h3>
      <p>{props.blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </p>
    </div>
  )
}

const Blog = ({ blog }) => {
  return (<div>{blog.title} by {blog.author} </div>  )
}

export default Blogs
