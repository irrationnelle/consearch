import React from 'react';
import { render } from '@testing-library/react';
import Menu from './menu';


test('renders concert list component', () => {
  const { getByText } = render(<Menu />);
  const linkElement = getByText(/list/);
  expect(linkElement).toBeInTheDocument();
});
