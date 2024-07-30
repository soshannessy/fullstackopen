import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setBlogTitle] = useState('')
  const [author, setBlogAuthor] = useState('')
  const [url, setBlogUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: null, type: '' })

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title,
      author,
      url
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNotification({ message: `${title} was successfully added!`, type: 'success' })
        setTimeout(() => {
          setNotification({ message: null, type: '' })
        }, 5000)
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification({ message: 'Wrong credentials', type: 'error' })
      setTimeout(() => {
        setNotification({ message: null, type: '' })
      }, 5000)
    }
  }

  const handleLike = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const updatedBlog = { ...blog, likes: (blog.likes || 0) + 1 }

    try {
      const returnedBlog = await blogService.update(id, updatedBlog)
      setBlogs(blogs.map(b => (b.id !== id ? b : returnedBlog)))
    } catch (exception) {
      setNotification({ message: 'Failed to like the blog', type: 'error' })
      setTimeout(() => {
        setNotification({ message: null, type: '' })
      }, 5000)
    }
  }

  const handleDelete = async (id) => {
    const blog = blogs.find(b => b.id === id)

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter(b => b.id !== id))
        setNotification({ message: `Removed blog: ${blog.title}`, type: 'success' })
      } catch (exception) {
        setNotification({ message: 'Failed to remove the blog', type: 'error' })
      }

      setTimeout(() => {
        setNotification({ message: null, type: '' })
      }, 5000)
    }
  }

  const handleLogout = async () => {
    window.localStorage.clear()
    window.location.reload()
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <div>
      <Togglable buttonLabel="create">
        <BlogForm
          title={title}
          author={author}
          url={url}
          handleTitleChange={({ target }) => setBlogTitle(target.value)}
          handleAuthorChange={({ target }) => setBlogAuthor(target.value)}
          handleUrlChange={({ target }) => setBlogUrl(target.value)}
          handleSubmit={addBlog}
        />
      </Togglable>
    </div>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={notification.message} type={notification.type} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification.message} type={notification.type} />
      <p>{user.name} logged-in<button onClick={handleLogout}>logout</button></p>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} loggedInUser={user.name} />
        ))}
      <h3>create a post</h3>
      {blogForm()}
    </div>
  )
}

export default App
