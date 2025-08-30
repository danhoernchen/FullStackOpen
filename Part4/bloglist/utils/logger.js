const info = (...params) => {
  if (process.env.NODE !== 'testing') {
    console.log(...params)
  }
}
const error = (...params) => {
  if (process.env.NODE !== 'testing') {
    console.error(...params)
  }
}
module.exports = { info, error }
