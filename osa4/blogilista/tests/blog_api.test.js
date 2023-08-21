const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('when there is initially some blogs saved', () => {
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

  describe('addition of a new blog', () => {
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
  })

  describe('deleting a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
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
  })

  describe('updating a blog', () => {
    test('succeeds with status code 200', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      const blogUpdate = {
        title: 'Updated React Patterns',
        likes: 10,
      }

      const result = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogUpdate)
        .expect(200)

      const blogsAtEnd = await helper.blogsInDb()
      const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
      expect(updatedBlog).toEqual(result.body)
      expect(updatedBlog.title).toBe(blogUpdate.title)

    })
  })
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
