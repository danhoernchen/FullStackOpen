const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userExtractor = async (req, res, next) => {
  const auth = req.get('authorization')
  if (auth && auth.startsWith('Bearer ')) {
    const decodedToken = jwt.verify(
      auth.replace('Bearer ', ''),
      process.env.SECRET
    )
    const user = await User.findById(decodedToken.id)
    req.user = user
  }

  next()
}

module.exports = userExtractor
