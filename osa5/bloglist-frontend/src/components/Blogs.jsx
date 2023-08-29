
const Blogs = (props) => {
    console.log('blogs', props)
    return  <p>{props.blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
      )}
      </p>
  }

  const Blog = ({ blog }) => {
    return (<div>{blog.title} {blog.author} </div>  ) 
  }

  export default Blogs
  