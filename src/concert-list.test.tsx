import React from 'react';
import { render, fireEvent} from '@testing-library/react';
import { renderHook, act } from "@testing-library/react-hooks";
import { Router, MemoryRouter , useLocation } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import '@testing-library/jest-dom/extend-expect'
import { mocked } from 'ts-jest/utils'
import {createStore} from 'redux'
import { Provider, connect } from 'react-redux'

import Concert from './concert';
import ConcertList from './concert-list';

import reducer from './reducers'


beforeAll(()=> {
     global.kakao = jest.fn().mockImplementation(()=>{
        return {maps: {
            Map: ()=>{return null;},
            LatLng: ()=>{return null;},
            services: {}
        }}
    });

    global.kakao.maps = jest.fn().mockImplementation(() => {
        return {
            Map: ()=>{return null;},
            LatLng: ()=>{return null;},
            services: {}
        };
    });
    global.kakao.maps.LatLng = jest.fn().mockImplementation(function() {
        return null;
    });
    global.kakao.maps.Map = jest.fn().mockImplementation(function () {
        return null;
    });
    global.kakao.maps.services = jest.fn().mockImplementation(function () {
        return {
            Geocoder: jest.fn()
        };
    });
    global.kakao.maps.services.Geocoder = jest.fn().mockImplementation(function () {
        return {
            addressSearch: jest.fn()
        }
    });

    global.kakao.maps.services.Geocoder.prototype.addressSearch = jest.fn();

    /*
    jest.mock("react-router-dom", () => ({
        ...jest.requireActual("react-router-dom"),
        useLocation: () => ({
            pathname: '/another-route',
            search: '',
            hash: '',
            state: {test: "scream"},
            key: '5nvxpbdafa',
        })
    }))
     */
})

describe("concert list component", () => {
    /*
    it('renders concert list component', () => {
      const history = createMemoryHistory()
      const { container, getByText } = render(
        <Router history={history}>
          <ConcertList />
        </Router>
      )

      const linkElement = getByText(/concert list/);
      expect(linkElement).toBeInTheDocument();
    });
     */

    /*
    it('renders each concert components', () => {
      const history = createMemoryHistory()
      const { container, getByText } = render(
        <Router history={history}>
          <ConcertList />
        </Router>
      )
      const linkElement = getByText(/amenra/);
      expect(linkElement).toBeInTheDocument();
    });
     */

    it('콘서트 리스트에서 콘서트를 클릭하면 콘서트로 이동한다.', () => {
      //given
      //const history = createMemoryHistory()

      const store = createStore(reducer);

      const { container, getByText } = render(
          <Provider store={store}>
            <MemoryRouter>
              <ConcertList />
            </MemoryRouter>
          </Provider>
      )

      expect(container.innerHTML).toMatch('concert list')

      //when
      // 여기서 클릭하기 위한 text를 가진 값이 없다. 즉 mocking 을 해서 만들어야 한다.
      fireEvent.click(getByText(/amenra/i))

      //then
      expect(container.innerHTML).toMatch('amenra')
    })
});

