const { describe, test } = require('node:test')
const assert = require('node:assert')
const { totalLikes } = require('../utils/totalLikes')

describe('totalLikes should sum up all likes in the received blog posts', () => {
  const blogPosts = [
    {
      _id: '68ada44aeb0e7e75473e4819',
      title: 'Hello, World!',
      author: 'Me',
      url: 'http://localhost',
      likes: 23,
      __v: 0
    },
    {
      _id: '68adab086b5cb02ffe23ffce',
      title: 'Hello, World!',
      author: 'Me',
      url: 'http://localhost',
      likes: 23,
      __v: 0
    },
    {
      _id: '68adab086b5cb02ffe23ffce',
      title: 'Hello, World!',
      author: 'Me',
      url: 'http://localhost',
      likes: 43,
      __v: 0
    },
    {
      _id: '68adab086b5cb02ffe23ffce',
      title: 'Hello, World!',
      author: 'Me',
      url: 'http://localhost',
      likes: 1,
      __v: 0
    }
  ]
  const result = totalLikes(blogPosts)
  assert.strictEqual(result, 90)
})
