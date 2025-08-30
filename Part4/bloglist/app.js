const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogRouter = require('./controllers/blog')
const { info, error } = require('./utils/logger')

const app = express()
app.use(express.json())
console.log(process.env.NODE_ENV, config.MONGODB_URI)

const mongoUrl = config.MONGODB_URI
mongoose
  .connect(mongoUrl)
  .then(() => info('connected'))
  .catch(err => error(err))

app.use('/api/blogs', blogRouter)

module.exports = app
