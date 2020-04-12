import React from 'react';
import { render } from '@testing-library/react';
import Concert from './concert';

test('renders concert list component', () => {
  const { getByText } = render(<Concert />);
  const linkElement = getByText(/name/);
  expect(linkElement).toBeInTheDocument();
});

