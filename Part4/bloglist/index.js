const config = require('./utils/config')
const app = require('./app')
const { info } = require('./utils/logger')

const { PORT } = config
app.listen(PORT, () => {
  info(`Server running on port ${PORT}`)
})
