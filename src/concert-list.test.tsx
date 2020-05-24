import React from 'react';
import { fireEvent} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import {createStore} from 'redux'
import { Provider } from 'react-redux'
import { shallow, mount, render } from 'enzyme';

import ConcertList from './concert-list';

import reducer from './reducers'



beforeAll(()=> {
    jest.doMock('./ConcertLocationMap', () => () => <div></div>)
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
      const store = createStore(reducer);

      const concertListComponent = shallow(
          <Provider store={store}>
            <MemoryRouter>
              <ConcertList />
            </MemoryRouter>
          </Provider>
      )

      expect(concertListComponent.text).toContain('concert list')

      //when
      // 여기서 클릭하기 위한 text를 가진 값이 없다. 즉 mocking 을 해서 만들어야 한다.
      // 현재는 하드코딩된 값으로 'amenra' 라는 값이 존재하지만 이후에는
      // 서버와 통신해서 받아올 때마다 동적인 값을 가지고 있을 것
      // 따라서 getByText 를 사용하지 않거나 mocking 이 필요하다.
      //fireEvent.click(concertListComponent.(/amenra/i))

      //then
      //expect(container.innerHTML).toMatch('amenra')
    })
});

