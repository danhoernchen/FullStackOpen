const { Blog } = require('../models/blog')
const initialBlogPosts = require('./initialBlogPosts')

const allBlogPosts = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const nonExistingId = async () => {
  const blogPost = new Blog({
    title: 'I have no content',
    author: 'me',
    likes: 3
  })
  await blogPost.save()
  await blogPost.deleteOne()

  return blogPost._id.toString()
}
module.exports = { initialBlogPosts, nonExistingId, allBlogPosts }
