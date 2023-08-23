const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('../utils/middleware').userExtractor


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})


blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id.toString()
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    response.status(400).json({ error: 'No such blog in database' })
  } else {

    if (blog.user.toString() === request.user._id.toString()) {
      await Blog.findByIdAndRemove(blog.id)
      response.status(204).end()
    }else{
      response.status(400)
    }
  }

})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = {
    title: request.body.title,
    author:request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }

  const result = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
  response.json(result)

})

module.exports = blogsRouter