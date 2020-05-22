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


describe("concert list component", () => {
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

