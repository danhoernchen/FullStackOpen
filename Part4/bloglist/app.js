const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRouter = require('./controllers/blog')
const { info, error } = require('./utils/logger')
const userRouter = require('./controllers/user')
const errorHandler = require('./controllers/errorHandler')
const loginRouter = require('./controllers/login')

const app = express()
app.use(express.json())
console.log(process.env.NODE_ENV, config.MONGODB_URI, config.SECRET)
const mongoUrl = config.MONGODB_URI
mongoose
  .connect(mongoUrl)
  .then(() => info('connected'))
  .catch(err => error(err))

app.use('/api/blogs', blogRouter)
app.use('/api/user', userRouter)
app.use('/login', loginRouter)
app.use(errorHandler)

module.exports = app
