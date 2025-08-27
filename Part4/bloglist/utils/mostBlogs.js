const lodash = require('lodash')

const mostBlogs = blogPosts => {
  const grouped = lodash.groupBy(blogPosts, ({ author }) => author)
  const sorted = lodash.orderBy(grouped, author => author.length, 'desc')
  return { author: sorted[0][0].author, blogs: sorted[0].length }
}

module.exports = mostBlogs
