const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = require('../test_blogs.json')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('the amount of blogs is correct', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
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

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
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
/*
test('blog without content is not added', async () => {
  const newBlog = {
    title: 'Hello world'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)

})*/

afterAll(async () => {
  await mongoose.connection.close()
})
