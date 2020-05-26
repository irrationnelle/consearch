import React from 'react';
import { render, fireEvent} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import ConcertList from './concert-list';
import reducer from './reducers'

beforeAll(()=> {
    global.kakao = jest.fn();
    global.kakao.maps = jest.fn();
    global.kakao.maps.LatLng = jest.fn();
    global.kakao.maps.Map = jest.fn();
    global.kakao.maps.services = jest.fn();
    global.kakao.maps.services.Geocoder = jest.fn();
    global.kakao.maps.services.Geocoder.prototype.addressSearch = jest.fn();
})

describe("concert", () => {
    it('back 버튼을 클릭하면 리스트로 돌아간다', () => {
      //given
      const store = createStore(reducer);

      const {container, getByText} = render(
          <Provider store={store}>
            <MemoryRouter>
              <ConcertList />
            </MemoryRouter>
          </Provider>
      )

      fireEvent.click(getByText(/amenra/i))

      //when
      fireEvent.click(getByText(/back/i))

      //then
      expect(container.innerHTML).toMatch('concert list')
    })
});
