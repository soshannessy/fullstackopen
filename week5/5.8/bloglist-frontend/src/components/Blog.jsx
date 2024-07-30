import { useState } from 'react'

const Blog = ({ blog, handleLike }) => { 
  const [detailsVisible, setDetailsVisible] = useState(false)

  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
  const showWhenVisible = { display: detailsVisible ? '' : 'none' }

  const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}
  
return (
  <div style={blogStyle}>
    <div style={hideWhenVisible}>
      {blog.title}{blog.author}<button onClick={() => setDetailsVisible(true)}>View</button>
    </div>
    <div style={showWhenVisible}>
      {blog.title}{blog.author}<button onClick={() => setDetailsVisible(false)}>Hide</button><br/>
      {blog.url}<br/>{blog.likes ? blog.likes : '0'} <button onClick={() => handleLike(blog.id)}>Likes</button><br/>
      {blog.user && blog.user.name ? blog.user.name : 'Unknown Author'}
      </div>
  </div>  
)}

export default Blog