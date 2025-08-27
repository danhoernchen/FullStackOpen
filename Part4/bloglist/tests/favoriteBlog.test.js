const { test, describe } = require('node:test')
const assert = require('node:assert')
const { favoriteBlog } = require('../utils/favoriteBlog')
const { blogPosts } = require('./blogPosts')

describe('favorite blog should return the most liked post from the received list', () => {
  const result = favoriteBlog(blogPosts)
  assert.deepStrictEqual(result, blogPosts[2])
  const singlePost = [
    {
      _id: '68adab086b5cb02ffe23ffce',
      title: 'Hello, World!',
      author: 'Me',
      url: 'http://localhost',
      likes: 1,
      __v: 0
    }
  ]
  const secondResult = favoriteBlog(singlePost)
  assert.deepStrictEqual(secondResult, singlePost[0])
})
