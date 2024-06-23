import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes || 0)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = async () => {
    const newLikes = likes + 1
    setLikes(newLikes)

    const updatedBlog = {
      ...blog,
      likes: newLikes,
    }

    try {
      await updateBlog(updatedBlog)
    } catch (error) {
      console.error('Failed to update blog:', error)
    }
  }

  const removeBlog = async () => {
    const confirmDelete = window.confirm(`Delete blog "${blog.title}" by ${blog.author}?`)
    if (confirmDelete) {
      try {
        await deleteBlog(blog.id)
      } catch (error) {
        console.error('Failed to delete blog:', error)
      }
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>
          {visible ? 'Hide' : 'View'}
        </button>
      </div>
      {visible && (
        <div>
          {blog.url}<br />
          <div>
            {likes} <button onClick={addLike}>Like</button><br />
          </div>
          {blog.user ? blog.user.name : 'Unknown user'}<br />
          <button onClick={removeBlog}>Remove</button>
        </div>
      )}
    </div>
  )
}

export default Blog