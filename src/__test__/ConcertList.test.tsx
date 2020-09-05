import React from 'react';
import { format, parseISO } from 'date-fns';
import ConcertList from '../ConcertList';
import { render, fireEvent } from '../helpers/test-utils';

import { mockConcerts } from '../__mock__/data';
import { RawConcert } from '../@models/concert';

describe('concert list', () => {
  it('콘서트 리스트에서 콘서트를 클릭하면 콘서트로 이동한다.', () => {
    // given
    const initialState: { concerts: RawConcert[], inputedGenres: string[] } = {
      concerts: mockConcerts,
      inputedGenres: [],
    };

    const { container, getByText } = render(<ConcertList />, {
      initialState,
    });

    expect(container.innerHTML).toMatch('concert list');

    // when
    fireEvent.click(getByText(mockConcerts[0].title));

    // then
    expect(container.innerHTML).toMatch(mockConcerts[0].title);
  });

  it('콘서트 리스트에는 가격, 밴드이름, 밴드 장르, 시간표가 나타나야 한다.', () => {
    // given
    const initialState: { concerts: RawConcert[], inputedGenres: string[] } = {
      concerts: mockConcerts,
      inputedGenres: [],
    };

    // when
    const { container } = render(<ConcertList />, {
      initialState,
    });

    // then
    expect(container.innerHTML).toMatch(mockConcerts[0].artists[0].name);
    expect(container.innerHTML).toMatch(mockConcerts[0].artists[0].genre);
    expect(container.innerHTML).toMatch(mockConcerts[0].price.toString());

    const rawTimetable = mockConcerts[0].timetable;
    const parsedTimetable = parseISO(rawTimetable);
    const expectedTime: string = format(parsedTimetable, 'HH:mma');
    const expectedDate: string = format(parsedTimetable, 'yyyy-MM-dd');

    expect(container.innerHTML).toMatch(expectedTime);
    expect(container.innerHTML).toMatch(expectedDate);
  });

  it('콘서트 목록에 옵션을 입력만 하면 어떤 콘서트 목록도 나타나지 않는다.', () => {
    // given
    const initialState: { concerts: RawConcert[], inputedGenres: string[] } = {
      concerts: mockConcerts,
      inputedGenres: [],
    };
    const { container, getByLabelText } = render(<ConcertList />, {
      initialState,
    });

    // when
    const input = getByLabelText('concert-genre');
    fireEvent.change(input, { target: { value: 'Metalcore' } });

    // then
    expect(container.innerHTML).toMatch(mockConcerts[0].artists[0].name);
    expect(container.innerHTML).toMatch(mockConcerts[1].artists[0].name);
    expect(container.innerHTML).toMatch(mockConcerts[2].artists[0].name);
    expect(container.innerHTML).toMatch(mockConcerts[3].artists[0].name);
    expect(container.innerHTML).toMatch(mockConcerts[4].artists[0].name);
  });

  it('콘서트 목록에 옵션을 입력한 뒤 추가 버튼을 누르면 옵션에 해당하는 콘서트 목록이 나타난다.', () => {
    // given
    const initialState: { concerts: RawConcert[], inputedGenres: string[] } = {
      concerts: mockConcerts,
      inputedGenres: [],
    };
    const { container, getByTestId, getByLabelText } = render(<ConcertList />, {
      initialState,
    });

    // when
    const input = getByLabelText('concert-genre');
    fireEvent.change(input, { target: { value: 'Metalcore' } });
    fireEvent.submit(getByTestId('form-add-genre'));

    // then
    expect(container.innerHTML).not.toMatch(mockConcerts[0].artists[0].name);
    expect(container.innerHTML).not.toMatch(mockConcerts[1].artists[0].name);
    expect(container.innerHTML).toMatch(mockConcerts[2].artists[0].name);
    expect(container.innerHTML).toMatch(mockConcerts[3].artists[0].name);
    expect(container.innerHTML).not.toMatch(mockConcerts[4].artists[0].name);
  });

  it('콘서트 목록에 같은 종류의 옵션을 2개 이상 입력한 뒤 각각 추가 버튼을 누르면 둘 중 한가지라도 해당하는 콘서트 목록이 나타난다.', () => {
    // given
    const initialState: { concerts: RawConcert[], inputedGenres: string[] } = {
      concerts: mockConcerts,
      inputedGenres: [],
    };
    const { container, getByTestId, getByLabelText } = render(<ConcertList />, {
      initialState,
    });

    // when
    const input = getByLabelText('concert-genre');
    const inputGenre = (genre: string) => fireEvent.change(input, { target: { value: genre } });
    const clickAddButton = () => fireEvent.submit(getByTestId('form-add-genre'));

    inputGenre('Metalcore');
    clickAddButton();
    inputGenre('PostMetal');
    clickAddButton();

    // then
    expect(container.innerHTML).not.toMatch(mockConcerts[0].artists[0].name);
    expect(container.innerHTML).not.toMatch(mockConcerts[1].artists[0].name);
    expect(container.innerHTML).toMatch(mockConcerts[2].artists[0].name);
    expect(container.innerHTML).toMatch(mockConcerts[3].artists[0].name);
    expect(container.innerHTML).toMatch(mockConcerts[4].artists[0].name);
  });

  it('콘서트 목록에 알 수 없는 옵션값을 입력하면 콘서트 목록이 비어있다', () => {
    // given
    const initialState: { concerts: RawConcert[], inputedGenres: string[] } = {
      concerts: mockConcerts,
      inputedGenres: [],
    };
    const { container, getByTestId, getByLabelText } = render(<ConcertList />, {
      initialState,
    });

    // when
    const input = getByLabelText('concert-genre');
    const inputGenre = (genre: string) => fireEvent.change(input, { target: { value: genre } });
    const clickAddButton = () => fireEvent.submit(getByTestId('form-add-genre'));

    inputGenre('ProgressiveMetal');
    clickAddButton();
    inputGenre('PostMetal');

    // then
    expect(container.innerHTML).not.toMatch(mockConcerts[0].artists[0].name);
    expect(container.innerHTML).not.toMatch(mockConcerts[1].artists[0].name);
    expect(container.innerHTML).not.toMatch(mockConcerts[2].artists[0].name);
    expect(container.innerHTML).not.toMatch(mockConcerts[3].artists[0].name);
    expect(container.innerHTML).not.toMatch(mockConcerts[4].artists[0].name);
  });

  it('콘서트 목록에 장르와 시간 날짜, 가격 등의 옵션을 조합하면 거기에 해당하는 결과가 나온다.', () => {
    // given
    const initialState: { concerts: RawConcert[], inputedGenres: string[] } = {
      concerts: mockConcerts,
      inputedGenres: [],
    };
    const { container, getByTestId, getByLabelText } = render(<ConcertList />, {
      initialState,
    });

    // when
    const input = getByLabelText('concert-genre');
    const inputSchedule = getByLabelText('concert-date');
    const inputGenre = (genre: string) => fireEvent.change(input, { target: { value: genre } });
    const clickAddButton = () => fireEvent.submit(getByTestId('form-add-genre'));

    inputGenre('Metalcore');
    fireEvent.change(inputSchedule, { target: { value: '2020-07-10' } });
    clickAddButton();

    // then
    expect(container.innerHTML).not.toMatch(mockConcerts[0].artists[0].name);
    expect(container.innerHTML).not.toMatch(mockConcerts[1].artists[0].name);
    expect(container.innerHTML).toMatch(mockConcerts[2].artists[0].name);
    expect(container.innerHTML).not.toMatch(mockConcerts[3].artists[0].name);
    expect(container.innerHTML).not.toMatch(mockConcerts[4].artists[0].name);
  });
});
