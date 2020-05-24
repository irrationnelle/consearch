import React from 'react';
import { render, fireEvent} from '@testing-library/react';
import { renderHook, act } from "@testing-library/react-hooks";
import { Router, MemoryRouter , useLocation } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import { mocked } from 'ts-jest/utils'

import Concert from './concert';
import ConcertList from './concert-list';

/*
jest.mock("react-router-dom", () => ({
  useLocation: jest.fn()
}));
 */

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

/*
const mockUseLocation = useLocation as jest.Mock;
 */

describe("concert component", () => {
    /*
    it('renders concert list component', async (done) => {

        // const mocked2 = mocked(useLocation, true);
        console.log(mocked(useLocation));
        mockUseLocation.mockImplementation(()=>({
            pathname: '/another-route',
            search: 'test',
            hash: 'test',
            state: {test: "scream"},
            key: '5nvxpbdafa',
        }));
        const { result } = renderHook(mocked(useLocation));

        console.log(result.current);

        expect((result.current.state as any).test).toEqual("scream");

        const history = createMemoryHistory()
      const { container, getByText } = render(
        <Router history={history}>
          <Concert key={"test"} name={"test"} />
        </Router>
      )

      const linkElement = getByText(/title/);
      expect(linkElement).toBeInTheDocument();
        done();
    });
     */

    /*
    // 근데 왜 이거 concert-list.text.tsx 가 아니라 여기에 있는 거지?
    it('콘서트 리스트에서 콘서트를 클릭하면 콘서트로 이동한다.', () => {
      //given
      const history = createMemoryHistory()
      const { container, getByText } = render(
        <MemoryRouter history={history}>
          <ConcertList />
        </MemoryRouter>
      )

      expect(container.innerHTML).toMatch('concert list')

      //when
      // 여기서 클릭하기 위한 text를 가진 값이 없다. 즉 mocking 을 해서 만들어야 한다.
      fireEvent.click(getByText(/amenra/i))

      //then
      expect(container.innerHTML).toMatch('amenra')
    })
        */
});
