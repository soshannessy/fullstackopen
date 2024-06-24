import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './Form'
import { vi } from 'vitest'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  render(<BlogForm createBlog={createBlog} />)

  const inputs = screen.getAllByRole('textbox')
  const saveButton = screen.getByRole('button', { name: /save/i })

  await userEvent.type(inputs[0], 'Blog Title')
  await userEvent.type(inputs[1], 'Author Name')
  await userEvent.type(inputs[2], 'www.blogurl.com')

  await userEvent.click(saveButton)

  expect(createBlog).toHaveBeenCalledTimes(1)
  expect(createBlog).toHaveBeenCalledWith({
    title: 'Blog Title',
    author: 'Author Name',
    url: 'www.blogurl.com'
  })

})
