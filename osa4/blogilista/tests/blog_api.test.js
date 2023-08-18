const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('the amount of blogs is correct', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the blog identification is called id', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach( blog => expect(blog.id).toBeDefined())
})

test('the first blog is about go to statements', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(titles).toContain('Go To Statement Considered Harmful')
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'We can code',
    author: 'Edsger W. Dijkstra',
    url : 'http://www.u.arizona.edu/~rubinson/copyright_violations/wecancode.html',
    likes: 8,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogs = await helper.blogsInDb()
  const titles = blogs.map(r => r.title)

  expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
  expect(titles).toContain(
    'We can code'
  )
})

test('if amount of likes is not given, likes is set to 0', async () => {
  const newBlog = {
    title: 'We can code',
    author: 'Edsger W. Dijkstra',
    url : 'http://www.u.arizona.edu/~rubinson/copyright_violations/wecancode.html'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

test('error is given if there`s no title field', async () => {
  const newBlog = {
    author: 'John No-Title',
    url : 'http://www.u.arizona.edu/~rubinson/copyright_violations/-.html',
    likes: 9,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogs = await helper.blogsInDb()

  expect(blogs).toHaveLength(helper.initialBlogs.length)

})

test('error is given if there`s no url field', async () => {
  const newBlog = {
    title: 'No url here',
    author: 'John Johnson',
    likes: 9,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogs = await helper.blogsInDb()

  expect(blogs).toHaveLength(helper.initialBlogs.length)
})

test('deleting a blog', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

  const ids = blogsAtEnd.map(blog => blog.id)
  expect(ids).not.toContain(blogToDelete.id)
})

afterAll(async () => {
  await mongoose.connection.close()
})
