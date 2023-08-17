const { countBy } = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce( (sum, blog) => {
    return sum + blog.likes
  } ,0)
}

const favoriteBlog = (blogs) => {
  const mostLikes = blogs.reduce( (max, blog) => {
    return blog.likes > max
      ? max = blog.likes
      : max
  }, 0)

  const mostLikedBlog = blogs.find( blog => blog.likes === mostLikes)

  return mostLikedBlog
    ? {
      'title': mostLikedBlog.title,
      'author': mostLikedBlog.author,
      'likes': mostLikedBlog.likes
    }
    : {
      'title': '',
      'author': '',
      'likes': 0
    }
}

const mostBlogs = (blogs) => {

  console.log(blogs)
  /**
   * Takes an array of blogs, counts the blogs of each author and
   * returns an array of authors with the number of blogs
   */
  const numberOfBlogs = Object.entries(countBy( blogs, (item) =>  item.author))
  console.log(numberOfBlogs)

  /**
   * Takes an array containing arrays of authors and number of blogs , defines which
   * has the highest number of blogs and returns an array containing
   * the author with most blogs and the number of blogs
   */
  const authorWithMostBlogs = numberOfBlogs.reduce((max, [key, val]) => {
    return val > max[1]
      ? [key , val]
      : max
  },['' , 0])

  console.log(authorWithMostBlogs)

  return {
    'author': authorWithMostBlogs[0],
    'blogs': authorWithMostBlogs[1]
  }

}





module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}