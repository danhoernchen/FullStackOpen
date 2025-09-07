const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { Blog } = require('../models/blog')
const User = require('../models/user')
const initialUsers = require('./initialUsers')
const { initialBlogPosts, allBlogPosts } = require('./test_helper')

const api = supertest(app)

describe('initializing db with predefined posts', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogPosts)
    await User.deleteMany({})
    await User.insertMany(initialUsers)
  })

  test('blog posts are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('blog posts have an id property', async () => {
    const blogPost = await allBlogPosts()
    assert.strictEqual(Object.hasOwn(blogPost[0], 'id'), true)
  })

  describe('creating posts', () => {
    test('blogPosts can be created and are properly saved to the database', async () => {
      const newBlogPost = {
        author: 'Benny',
        title: 'Bark bark!',
        url: 'http://localhost',
        likes: 3921
      }
      const lengthBefore = await allBlogPosts()
      await api
        .post('/api/blogs')
        .send(newBlogPost)
        .set('Content-Type', 'application/json')
      const lengthAfter = await allBlogPosts()
      assert.notEqual(lengthBefore.length, lengthAfter.length)
    })

    test('blogPosts created without a likes property should default to 0 likes', async () => {
      const newBlogPost = {
        author: 'Benny',
        title: 'Cheese is simply the best!',
        url: 'http://localhost'
      }
      const savedPost = await api
        .post('/api/blogs')
        .send(newBlogPost)
        .set('Content-Type', 'application/json')
      assert.strictEqual(savedPost.body.likes, 0)
    })

    test('blogPosts without title or url should not be saved and a 400 error should be returned', async () => {
      const noTitle = { author: 'MeMe', url: 'http://localhost', likes: 23 }
      const noUrl = { author: 'MoMo', title: 'YabbaDabba' }
      const noTitleResult = await api
        .post('/api/blogs')
        .send(noTitle)
        .set('Content-Type', 'application/json')
      const noUrlResult = await api
        .post('/api/blogs')
        .send(noUrl)
        .set('Content-Type', 'application/json')
      assert.deepStrictEqual(
        [noTitleResult.status, noUrlResult.status],
        [400, 400]
      )
    })
  })
  describe('modifying posts', () => {
    test('blogposts should be deletable via /api/blogs/:id', async () => {
      const newBlog = {
        author: 'The Deletor',
        title: 'I will be deleted',
        url: 'http://localhost'
      }
      const savedNote = await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Content-Type', 'application/json')
      const { id } = savedNote.body
      const result = await api.delete(`/api/blogs/${id}`)
      assert.strictEqual(result.status, 204)
    })
    test('blogposts can be updated', async () => {
      const newBlog = {
        author: 'The Updater',
        title: 'I will get likes!',
        url: 'http://localhost'
      }
      const savedNote = await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Content-Type', 'application/json')
      const { id } = savedNote.body
      const likes = { likes: 1234 }
      const updated = await api
        .put(`/api/blogs/${id}`)
        .send(likes)
        .set('Content-Type', 'application/json')
      assert.strictEqual(updated.body.likes, 1234)
    })

    describe('creating users', () => {
      test('create new, valid user', async () => {
        const newUser = {
          username: 'BruMan',
          name: 'Bruno',
          password: 'asdf123'
        }
        const savedUser = await api
          .post('/api/user')
          .send(newUser)
          .set('Content-Type', 'application/json')
        console.log(savedUser.body)
      })
    })
    after(async () => {
      await mongoose.connection.close()
    })
  })
})
