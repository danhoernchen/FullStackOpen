const blogRouter = require('express').Router()
const { Blog } = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const all = await Blog.find({})
  response.json(all)
})

blogRouter.get('/:id', async (req, res) => {
  const note = await Blog.findById(req.params.id)
  if (note) {
    res.send(note)
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

module.exports = blogRouter
