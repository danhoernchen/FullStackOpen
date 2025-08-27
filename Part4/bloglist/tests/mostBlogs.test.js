const { describe, test } = require('node:test')
const assert = require('node:assert')
const mostBlogs = require('../utils/mostBlogs')
const { blogPosts } = require('./blogPosts')

describe('mostBlogs should return the authors name with most entries and the number of posts', () => {
  const result = mostBlogs(blogPosts)
  const expected = { author: 'Me', blogs: 4 }
  assert.deepStrictEqual(result, expected)
  const singlePost = [
    {
      _id: '68ada44aeb0e7e75473e4819',
      title: 'Hello, World!',
      author: 'Me',
      url: 'http://localhost',
      likes: 23,
      __v: 0
    }
  ]
  const singleResult = mostBlogs(singlePost)
  assert.deepEqual(singleResult, { author: 'Me', blogs: 1 })
})
