
const BlogForm = ({
    addBlog,
    title,
    handleTitleChange,
    author,
    handleAuthorChange,
    url,
    handleUrlChange
}) => (
    <div>
    <h2>Create a blog</h2>
    <form onSubmit={addBlog}>
     <ul> 
      <li>
        title
        <input
        type='text'
        value={title}
        name="Title"
        onChange={handleTitleChange}
      />
      </li>
      <li>author
      <input
        type='text'
        value={author}
        name="Author"
        onChange={handleAuthorChange}
      />
      </li>
      <li>url
      <input
        type='text'
        value={url}
        name="url"
        onChange={handleUrlChange}
      />
      </li>
      </ul>
      <button type="submit">create</button>
    </form>
     </div> 
  )

  export default BlogForm