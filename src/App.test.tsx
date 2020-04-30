import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders each concert components', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/amenra/);
  expect(linkElement).toBeInTheDocument();
});
