import React from 'react';
import { render } from '@testing-library/react';

import ConcertLocationMap from '../ConcertLocationMap';

// TODO: this test is not valid.
test('renders concert list component', () => {
  const { container } = render(
    <ConcertLocationMap address="test" />,
  );
  expect(container.innerHTML).not.toBeNull();
});
