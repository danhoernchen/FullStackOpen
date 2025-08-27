const { test, describe } = require('node:test')
const assert = require('node:assert')
const mostLikes = require('../utils/mostLikes')
const { blogPosts } = require('./blogPosts')

describe('mostLikes should return the author with most likes on his posts and the total number of likes', () => {
  const result = mostLikes(blogPosts)
  assert.deepStrictEqual(result, { author: 'Me', likes: 90 })
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
  const singleResult = mostLikes(singlePost)
  assert.deepEqual(singleResult, { author: 'Me', likes: 23 })
})
