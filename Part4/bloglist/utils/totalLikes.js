const totalLikes = blogPosts => {
  const likes = blogPosts.map(blogPost => blogPost.likes)
  return likes.reduce((total, current) => total + current)
}

module.exports = { totalLikes }
