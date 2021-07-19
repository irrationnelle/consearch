import React from 'react';
import { renderWithProviders, screen } from '../helpers/test-utils';
import ReadConcerts from '../ReadConcerts';

describe('ReadConcerts 에서는,', () => {
  beforeEach(() => {
    renderWithProviders(
      <ReadConcerts />,
    );
  });

  it('해당 컴포넌트가 존재한다.', () => {
    const span = screen.getByTestId('read-concerts');
    expect(span).toBeInTheDocument();
  });
});
