import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

test('use view button and check likes + url', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Mr Author',
    likes: 3,
    url: 'www.website.com'
  };

  render(<Blog key={blog.id} blog={blog} />);

  const user = userEvent.setup();
  
  const button = screen.getByText('View');
  await user.click(button);

  const textMatcher = (content, element) => {
    return content.includes('www.website.com') && content.includes('3');
  };

  const expandedContent = screen.getByText(textMatcher);

  expect(expandedContent).toBeInTheDocument();
});
