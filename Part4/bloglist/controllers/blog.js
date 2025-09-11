const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const { Blog } = require('../models/blog')
const User = require('../models/user')

const getToken = req => {
  const auth = req.get('authorization')
  console.log(auth)
  if (auth && auth.startsWith('Bearer ')) {
    console.log('getToken')
    return auth.replace('Bearer ', '')
  }
  return null
}

blogRouter.get('/', async (_request, response) => {
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
  const { body } = request
  console.log(request.get('authorization'))
  const decodedToken = jwt.verify(getToken(request), process.env.SECRET)
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    like: body.likes,
    user
  })
  const saved = await blog.save()
  user.blogPosts = user.blogPosts.concat(saved.id)
  await user.save()
  return response.status(201).json(saved)
})

blogRouter.delete('/:id', async (req, res) => {
  const deleted = await Blog.findByIdAndDelete(req.params.id)
  res.status(204).json(deleted)
})

blogRouter.put('/:id', async (req, res) => {
  const post = await Blog.findById(req.params.id)
  post.likes = req.body.likes
  const updated = await post.save()
  res.status(201).json(updated)
})

module.exports = blogRouter
