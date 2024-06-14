const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mmongodb+srv://samoshannessy:${password}@cluster0.rwzjzp3.mongodb.net/Blog?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url).then(() => {
  const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
  })

  const Blog = mongoose.model('Blog', blogSchema)

  Blog.find({}).then(result => {
    result.forEach(blog => {
      console.log(blog)
    })
    mongoose.connection.close()
  })
})

