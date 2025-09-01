const blogRouter = require('express').Router()
const { Blog } = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const all = await Blog.find({})
  response.json(all)
})

blogRouter.get('/:id', async (req, res) => {
  const note = await Blog.findById(req.params.id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).send('message id not in db')
  }
})

blogRouter.post('/', async (request, response) => {
  try {
    const blog = new Blog(request.body)
    const saved = await blog.save()
    response.status(201).json(saved)
  } catch (error) {
    response.status(400).send(error)
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
