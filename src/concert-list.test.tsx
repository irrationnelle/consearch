import React from 'react';
import { render } from '@testing-library/react';
import ConcertList from './concert-list';


test('renders concert list component', () => {
  const { getByText } = render(<ConcertList />);
  const linkElement = getByText(/concert list/);
  expect(linkElement).toBeInTheDocument();
});

test('renders each concert components', () => {
  const { getByText } = render(<ConcertList />);
  const linkElement = getByText(/megadeth/);
  expect(linkElement).toBeInTheDocument();
});
