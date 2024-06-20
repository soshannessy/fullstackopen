const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
      title: 'Blog: 1',
      author: 'Author1',
      url: 'www.website1.com',
      likes: 3
    },
    {
      title: 'Blog: 2',
      author: 'Author2',
      url: 'www.website2.com',
      likes: 6
    },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'New Author', URL: "www.newblog.com", likes: 3 })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}