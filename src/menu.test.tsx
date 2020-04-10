import React from 'react';
import { render } from '@testing-library/react';
import Menu from './menu';


test('renders concert list component', () => {
  const { getByText } = render(<Menu />);
  const linkElement = getByText(/around/);
  expect(linkElement).toBeInTheDocument();
});
