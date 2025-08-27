const favoriteBlog = blogPosts => {
  let result = blogPosts[0]
  blogPosts.forEach(blogPost => {
    if (blogPost.likes > result.likes) {
      result = blogPost
    }
  })
  return result
}

module.exports = { favoriteBlog }
