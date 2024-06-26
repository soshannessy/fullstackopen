import React, { useState } from 'react';

const Blog = ({ blog, updateBlog, deleteBlog, loggedInUserName }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog && blog.likes ? blog.likes : 0); // Ensure blog and blog.likes are defined

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const addLike = async () => {
    const newLikes = likes + 1;
    setLikes(newLikes);

    const updatedBlog = {
      ...blog,
      likes: newLikes
    };

    try {
      await updateBlog(updatedBlog);
    } catch (error) {
      console.error('Failed to update blog:', error);
    }
  };

  const removeBlog = async () => {
    const confirmDelete = window.confirm(`Delete blog "${blog.title}" by ${blog.author}?`);
    if (confirmDelete) {
      try {
        await deleteBlog(blog.id);
      } catch (error) {
        console.error('Failed to delete blog:', error);
      }
    }
  };

  // Ensure blog and blog.user are defined before rendering
  const userName = blog && blog.user ? blog.user.name : 'Unknown user';

  return (
    <div className='blog' style={blogStyle}>
      <div>
        {blog && blog.title} {blog && blog.author}
        <button onClick={toggleVisibility}>
          {visible ? 'Hide' : 'View'}
        </button>
      </div>
      {visible && (
        <div>
          {blog && blog.url}<br />
          <div>
            Likes: {likes} <button onClick={addLike}>Like</button><br />
          </div>
          {userName}<br />
          {/* Ensure loggedInUserName matches the name, not the whole user object */}
          {loggedInUserName === userName && (
            <button onClick={removeBlog}>Remove</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
