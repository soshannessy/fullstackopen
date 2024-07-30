const dummy = (blogs) => {
    return 1;
  }
  
const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, blog) => {
    return sum + blog.likes;
  }, 0);

  return total;
};

const favouriteBlog = (blogs) => {
  let maxLikes = -1;
  let favouriteBlog = null;

  blogs.forEach(blog => {
    if (blog.likes > maxLikes) {
      maxLikes = blog.likes;
      favouriteBlog = blog;
    }
  });

  return favouriteBlog;
};

  module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
  }