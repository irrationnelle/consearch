import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider, useSelector } from 'react-redux'
import { mocked } from 'ts-jest/utils'

import ConcertList from './concert-list';
import reducer from './reducers'

import { getSelector } from './selectors';

jest.mock('react-redux', () => 
     ({
        ...jest.requireActual('react-redux'),
        useSelector: jest.fn()
    })
);
jest.mock("./selectors");

let mockConcertData: {concerts: {title: string; id: number}[]};

beforeAll(()=> {
    (global as any).kakao = jest.fn();
    (global as any).kakao.maps = jest.fn();
    (global as any).kakao.maps.LatLng = jest.fn();
    (global as any).kakao.maps.Map = jest.fn();
    (global as any).kakao.maps.services = jest.fn();
    (global as any).kakao.maps.services.Geocoder = jest.fn();
    (global as any).kakao.maps.services.Geocoder.prototype.addressSearch = jest.fn();


    mockConcertData = {concerts: [{title: 'baroness', id: 1}]};
    mocked(useSelector).mockImplementationOnce(() => mockConcertData);
    mocked(getSelector).mockImplementationOnce(() => mockConcertData);
})

describe("concert list", () => {
    it('콘서트 리스트에서 콘서트를 클릭하면 콘서트로 이동한다.', () => {
      //given
      const store = createStore(reducer);

      const {container, getByText} = render(
          <Provider store={store}>
            <MemoryRouter>
              <ConcertList />
            </MemoryRouter>
          </Provider>
      )

      expect(container.innerHTML).toMatch('concert list')

      //when
      fireEvent.click(getByText(mockConcertData.concerts[0].title))

      //then
      expect(container.innerHTML).toMatch(mockConcertData.concerts[0].title);
    })
});

