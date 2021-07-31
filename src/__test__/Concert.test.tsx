import React from 'react';
import LegacyConcertList from '../LegacyConcertList';
import { render, fireEvent } from '../helpers/test-utils';

import { RawConcert } from '../@models/concert';
import { mockConcerts } from '../__mock__/data';

describe('concert', () => {
  it('back 버튼을 클릭하면 리스트로 돌아간다', () => {
    // given
    const initialState: { concerts: RawConcert[], inputedGenres: string[] } = {
      concerts: mockConcerts,
      inputedGenres: [],
    };
    const { container, getByText } = render(<LegacyConcertList />, {
      initialState,
    });

    // when
    fireEvent.click(getByText(mockConcerts[0].title));
    fireEvent.click(getByText(/back/i));

    // then
    expect(container.innerHTML).toMatch('concert list');
  });
});
