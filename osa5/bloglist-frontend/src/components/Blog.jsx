import { useState } from 'react'

const Blog = ({ blog }) => {
    console.log(blog)
    const [blogInfoVisible, setBlogInfoVisible] = useState(false)
  
    const hideWhenVisible = { display: blogInfoVisible ? 'none' : '' }
    const showWhenVisible = { display: blogInfoVisible ? '' : 'none' }

    const toggleVisibility = () =>{
        setBlogInfoVisible(!blogInfoVisible)
    }

  return (<div className='blog'>
    <div style={hideWhenVisible}>{blog.title} - {blog.author}
    <button onClick={toggleVisibility}>view</button>
     </div>
     <div style={showWhenVisible}>
        <p>{blog.title} - {blog.author} <button onClick={toggleVisibility}>hide</button> </p>
     <p>{blog.url}</p>
     <p>{blog.likes} <button>like</button></p>
     <p>{blog.user.username}</p>
     </div>
     </div>  
  )
}

export default Blog