import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import { vi } from 'vitest';

describe('<Blog />', () => {
  let container;
  const mockHandler = vi.fn();

  const blog = {
    title: 'Testing',
    author: 'Test',
    url: 'www.test.com',
    likes: 5,
    user: {
      id: '6673b24cab615824ed65b786',
      name: 'Mr Test',
      username: 'mluukkai'
    }
  };

  beforeEach(() => {
    ({ container } = render(<Blog blog={blog} updateBlog={mockHandler} deleteBlog={mockHandler} toggleVisibility={mockHandler} />));
  });

  test('renders blog', () => {
    expect(container.querySelector('.blog')).toHaveTextContent('Testing');
  });

  test('renders likes and url after clicking "View"', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('View');
    await user.click(button);

    expect(screen.getByText(/www\.test\.com/i)).toBeInTheDocument();
    expect(screen.getByText(/5/)).toBeInTheDocument();
  });

  test('check likes are rendered twice', async () => {
    const user = userEvent.setup();
    const button = screen.getByText('View');
    await user.click(button);

    const likeButton = screen.getByText('Like');
    await user.click(likeButton); 
    await user.click(likeButton);

    expect(mockHandler).toHaveBeenCalledTimes(2);
  });
});

