const blogRouter = require('express').Router()
const { Blog } = require('../models/blog')

// const getToken = req => {
//   const auth = req.get('authorization')
//   console.log(auth)
//   if (auth && auth.startsWith('Bearer ')) {
//     console.log('getToken')
//     return auth.replace('Bearer ', '')
//   }
//   return null
// }

blogRouter.get('/', async (_request, response) => {
  const all = await Blog.find({}).populate('user')
  response.json(all)
})

blogRouter.get('/:id', async (req, res) => {
  const post = await Blog.findById(req.params.id).populate('user')
  if (post) {
    res.json(post)
  } else {
    res.status(404).send('id not in db')
  }
})

blogRouter.post('/', async (request, response) => {
  const { body, user } = request
  if (!user) {
    return response.status(401).json({ error: 'invalid token' })
  }
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
  const post = await Blog.findById(req.params.id)
  const { user } = req
  if (!post) {
    return res.status(404).json({ error: 'post not in db' })
  }
  if (post.user.toString() === user.id.toString()) {
    const deleted = await Blog.findByIdAndDelete(req.params.id)
    user.blogPosts = user.blogPosts.filter(
      id => id.toString() !== req.params.id
    )
    await user.save()
    console.log(user)
    return res.status(204).json(deleted)
  }
  return res.status(401).json({ error: 'not allowed' })
})

blogRouter.put('/:id', async (req, res) => {
  const post = await Blog.findById(req.params.id)
  post.likes = req.body.likes
  const updated = await post.save()
  res.status(201).json(updated)
})

module.exports = blogRouter
