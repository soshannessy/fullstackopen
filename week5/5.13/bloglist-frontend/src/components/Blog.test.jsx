import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Mr Author',
    likes: 3,
    url:'www.website.com'
  }

  render(<Blog key={blog.id} blog={blog} /> )

  const element = screen.getByText('Component testing is done with react-testing-library Mr Author')
  screen.debug(element)
  expect(element).toBeDefined()
})