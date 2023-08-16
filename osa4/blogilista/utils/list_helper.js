

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce( (sum, blog) => {
    return sum + blog.likes
  } ,0)
}

const favoriteBlog = (blogs) => {
  const mostLikes = blogs.reduce( (sum, blog) => {
    return blog.likes > sum
      ? sum = blog.likes
      : sum
  }, 0)

  const mostLikedBlog = blogs.find( blog => blog.likes === mostLikes)
  
  return mostLikedBlog
    ? {
      'title': mostLikedBlog.title,
      'author': mostLikedBlog.author,
      'likes': mostLikedBlog.likes
    }
    : null
}

const mostBlogs = (blogs) => {
  const authors = blogs.map( blog => blog.author)
  console.log(authors)
    
  const func = (item) => item

  const numberOfBlogs =_.countBy( authors, func);

  console.log(numberOfBlogs)
  
    return authors

}





module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}