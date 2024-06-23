import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/Login'
import BlogForm from './components/Form'
import Togglable from './components/Togglable.jsx'
import './style.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginError, setLoginError] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setLoginError('')
    } catch (exception) {
      console.error('Wrong credentials:', exception)
      setLoginError('Invalid username or password')
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      })
  }

  const deleteBlog = async (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  const updateBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog.id, blog)
      const updatedBlogs = blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b)
      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
    } catch (err) {
      console.error('Updating blog failed:', err)
    }
  }

  const blogForm = () => (
    <Togglable buttonLabelOpen='new blog' buttonLabelClose='Cancel' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const loginForm = () => (
    <div>
      <Togglable buttonLabelOpen='login' buttonLabelClose='Cancel'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
      {loginError && <div className='error'>{loginError}</div>}
    </div>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <>
      <div>
        <h2>blogs</h2>
        <p>{user.username} logged-in <button onClick={handleLogout}>Logout</button></p>
        {blogs
          .filter(blog => blog.authorId === user.userId)
          .sort((a, b) => (b.likes || 0) - (a.likes || 0))
          .map(blog => (
            <div key={blog.id}>
              <Blog blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
            </div>
          ))}
      </div>
      <div>
        {blogForm()}
      </div>
    </>
  )
}

export default App
