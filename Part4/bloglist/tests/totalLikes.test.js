const { describe, test } = require('node:test')
const assert = require('node:assert')
const { totalLikes } = require('../utils/totalLikes')
const { blogPosts } = require('./blogPosts')

describe('totalLikes should sum up all likes in the received blog posts', () => {
  const result = totalLikes(blogPosts)
  assert.strictEqual(result, 126)
  const singlePost = totalLikes([blogPosts[0]])
  assert.strictEqual(singlePost, 23)
})
