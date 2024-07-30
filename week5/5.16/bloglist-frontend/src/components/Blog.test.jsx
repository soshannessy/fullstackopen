import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

test('check like button works if clicked twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Mr Author',
    likes: 3,
    url: 'www.website.com'
  };

  const mockHandler = vi.fn()

  render(<Blog key={blog.id} blog={blog} handleLike={mockHandler} />);
  
  const user = userEvent.setup()
  const View = screen.getByText('View');
  await user.click(View);
  const Like1 = screen.getByText('Likes');
  await user.click(Like1);
  const Like2 = screen.getByText('Likes');
  await user.click(Like2);

  expect(mockHandler.mock.calls).toHaveLength(2)
});
