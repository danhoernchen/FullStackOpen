const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogPosts')
  res.status(200).json(users)
})

userRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body
  if (username.length < 3 || password.length < 3) {
    res.status(400).json({
      message: 'username and password must be at least 3 characters long'
    })
  }

  const saltRounds = 10
  const passHash = await bcrypt.hash(password, saltRounds)

  const user = new User({ username, name, password: passHash })

  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

module.exports = userRouter
