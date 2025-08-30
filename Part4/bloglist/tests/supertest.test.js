const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { Blog } = require('../models/blog')
const { initialBlogPosts, allBlogPosts } = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogPosts)
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
  assert.deepStrictEqual([noTitleResult.status, noUrlResult.status], [400, 400])
})

after(async () => {
  await mongoose.connection.close()
})
