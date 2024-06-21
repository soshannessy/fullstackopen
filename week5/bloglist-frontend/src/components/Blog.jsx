import React, { useState } from 'react';

const Blog = ({ blog, updateBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const [visible, setVisible] = useState(false);
  const [likes, setLikes] = useState(blog.likes || 0)

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const addLike = async () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    
    const updatedBlog = {
      ...blog,
      likes: newLikes,
    };

    try {
      await updateBlog(updatedBlog);
    } catch (error) {
      console.error('Failed to update blog:', error);
    }
  };

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
          {blog.user.name}
        </div>
      )}
    </div>
  );
};

export default Blog;