const lodash = require('lodash')

const mostLikes = blogPosts => {
  const grouped = lodash.groupBy(blogPosts, ({ author }) => author)
  const authors = Object.keys(grouped)
  const totals = []
  authors.forEach(author => {
    const newAuthor = {
      name: author,
      likes: grouped[author].reduce((total, el) => total + el.likes, 0)
    }
    totals.push(newAuthor)
  })
  const result = lodash.orderBy(totals, author => author.likes, 'desc')
  return { author: result[0].name, likes: result[0].likes }
}
module.exports = mostLikes
