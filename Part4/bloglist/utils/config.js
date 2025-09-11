require('dotenv').config()

const { PORT } = process.env
const { SECRET } = process.env
const MONGODB_URI =
  process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'testing'
    ? process.env.MONGODB_URI_TESTING
    : process.env.MONGODB_URI
module.exports = { MONGODB_URI, PORT, SECRET }
