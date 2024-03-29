import React from 'react';
import { waitFor, fireEvent } from '@testing-library/react';
import { renderWithProviders, screen } from '../helpers/test-utils';
import * as api from '../api/concert';
import inputTextByLabel from './helper/inputTextByLabel';
import ConcertSearch from '../ConcertSearch';

export const EXAMPLE_DATA = {
  title: '마스토돈',
  artist: '마스토돈',
  stage: '롤링홀',
  address: '서울 마포구 어울마당로 35',
  genre: 'rockmetal',
  date: '2021-06-26-20:00',
  price: 10000,
  coverImage: '',
};

const SECOND_EXAMPLE_DATA = {
  title: '라니아 공연',
  artist: '라니아',
  stage: 'FF',
  address: '서울 마포구 어울마당로 37',
  genre: '인디락',
  date: '2021-07-20-20:00',
  price: 30000,
  coverImage: '',
};

export const THIRD_EXAMPLE_DATA = {
  title: '마스토돈 내한공연',
  artist: '마스토돈',
  stage: 'V-HALL',
  address: '서울 마포구 어울마당로 38',
  genre: 'rockmetal',
  date: '2021-07-22-21:00',
  price: 20000,
  coverImage: '',
};

describe('ReadConcerts 에서는,', () => {
  beforeEach(() => {
    renderWithProviders(
      <ConcertSearch />,
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('해당 컴포넌트가 존재한다.', () => {
    const span = screen.getByTestId('concert-search');
    expect(span).toBeInTheDocument();
  });

  it('컴포넌트를 렌더링하면 공연 목록을 읽는다.', () => {
    // given, when
    jest.spyOn(api, 'readConcertApi').mockResolvedValue([EXAMPLE_DATA, SECOND_EXAMPLE_DATA]);

    // then
    waitFor(() => {
      const concerts = screen.getAllByRole('listitem');
      const firstConcert = concerts[0];

      expect(firstConcert).toHaveTextContent(EXAMPLE_DATA.title);
      expect(firstConcert).toHaveTextContent(EXAMPLE_DATA.artist);
      expect(firstConcert).toHaveTextContent(EXAMPLE_DATA.genre);
      expect(firstConcert).toHaveTextContent(EXAMPLE_DATA.stage);
      expect(firstConcert).toHaveTextContent(EXAMPLE_DATA.address);
      expect(firstConcert).toHaveTextContent(EXAMPLE_DATA.date);

      const secondConcert = concerts[1];

      expect(secondConcert).toHaveTextContent(SECOND_EXAMPLE_DATA.title);
      expect(secondConcert).toHaveTextContent(SECOND_EXAMPLE_DATA.artist);
      expect(secondConcert).toHaveTextContent(SECOND_EXAMPLE_DATA.genre);
      expect(secondConcert).toHaveTextContent(SECOND_EXAMPLE_DATA.stage);
      expect(secondConcert).toHaveTextContent(SECOND_EXAMPLE_DATA.address);
      expect(secondConcert).toHaveTextContent(SECOND_EXAMPLE_DATA.date);
    });
  });

  it('공연 이름으로 원하는 공연 다수를 검색할 수 있다.', () => {
    jest.spyOn(api, 'readSingleConcertApiByTitle').mockResolvedValue([EXAMPLE_DATA, THIRD_EXAMPLE_DATA]);

    waitFor(() => {
      inputTextByLabel('title-search', EXAMPLE_DATA.title);
      fireEvent.click(screen.getByRole('button'));
    });

    waitFor(() => {
      // then
      const concerts = screen.getAllByRole('listitem');
      const firstConcert = concerts[0];

      expect(firstConcert).toHaveTextContent(EXAMPLE_DATA.title);
      expect(firstConcert).toHaveTextContent(EXAMPLE_DATA.artist);
      expect(firstConcert).toHaveTextContent(EXAMPLE_DATA.genre);
      expect(firstConcert).toHaveTextContent(EXAMPLE_DATA.stage);
      expect(firstConcert).toHaveTextContent(EXAMPLE_DATA.address);
      expect(firstConcert).toHaveTextContent(EXAMPLE_DATA.date);

      const secondConcert = concerts[1];

      expect(secondConcert).not.toHaveTextContent(SECOND_EXAMPLE_DATA.title);
      expect(secondConcert).not.toHaveTextContent(SECOND_EXAMPLE_DATA.artist);
      expect(secondConcert).not.toHaveTextContent(SECOND_EXAMPLE_DATA.genre);
      expect(secondConcert).not.toHaveTextContent(SECOND_EXAMPLE_DATA.stage);
      expect(secondConcert).not.toHaveTextContent(SECOND_EXAMPLE_DATA.address);
      expect(secondConcert).not.toHaveTextContent(SECOND_EXAMPLE_DATA.date);

      expect(secondConcert).toHaveTextContent(THIRD_EXAMPLE_DATA.title);
      expect(secondConcert).toHaveTextContent(THIRD_EXAMPLE_DATA.artist);
      expect(secondConcert).toHaveTextContent(THIRD_EXAMPLE_DATA.genre);
      expect(secondConcert).toHaveTextContent(THIRD_EXAMPLE_DATA.stage);
      expect(secondConcert).toHaveTextContent(THIRD_EXAMPLE_DATA.address);
      expect(secondConcert).toHaveTextContent(THIRD_EXAMPLE_DATA.date);
    });
  });
});
