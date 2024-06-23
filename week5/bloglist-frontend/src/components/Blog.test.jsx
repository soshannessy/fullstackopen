import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import { vi } from 'vitest';

test('renders content and toggles importance', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'React Test',
    url: 'http://example.com',
    likes: 0,
    user: { name: 'Tester' }
  };

  const mockHandler = vi.fn();

  render(<Blog blog={blog} updateBlog={() => {}} deleteBlog={() => {}} toggleVisibility={mockHandler}/>);

  const element = screen.getByText(/Component testing is done with react-testing-library/i);
  expect(element).toBeInTheDocument();

  const user = userEvent.setup();
  const button = screen.getByText('hide');
  await user.click(button);

  expect(mockHandler).toHaveBeenCalledTimes(1); 
});