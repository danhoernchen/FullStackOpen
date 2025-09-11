const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })
  const checkPass =
    user === null ? false : await bcrypt.compare(password, user.password)

  if (!(user && checkPass)) {
    return res.status(401).json({ error: 'name or password wrong' })
  }

  const tokenData = { user: user.username, id: user._id }
  console.log(process.env.SECRET)

  const token = jwt.sign(tokenData, process.env.SECRET)

  return res
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
