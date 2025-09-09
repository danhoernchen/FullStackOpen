const blogRouter = require('express').Router()
const { Blog } = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const all = await Blog.find({}).populate('user')
  response.json(all)
})

blogRouter.get('/:id', async (req, res) => {
  const note = await Blog.findById(req.params.id).populate('user')
  if (note) {
    res.json(note)
  } else {
    res.status(404).send('message id not in db')
  }
})

blogRouter.post('/', async (request, response) => {
  try {
    const blog = new Blog(request.body)
    const user = await User.find({})
    // eslint-disable-next-line prefer-destructuring
    blog.user = user[0]._id
    const saved = await blog.save()
    user[0].blogPosts = user[0].blogPosts.concat(saved.id)
    await user[0].save()
    response.status(201).json(saved)
  } catch (error) {
    response.status(400).json(error)
    console.log(error)
  }
})

blogRouter.delete('/:id', async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id)
    res.status(204).json(deleted)
  } catch (error) {
    res.status(404).json({ error })
  }
})

blogRouter.put('/:id', async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id)
    post.likes = req.body.likes
    const updated = await post.save()
    res.status(201).json(updated)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
})

module.exports = blogRouter
