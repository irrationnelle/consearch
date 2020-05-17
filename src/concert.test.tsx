import React from 'react';
import { render, fireEvent} from '@testing-library/react';
import { Router, useLocation } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import { mocked } from 'ts-jest/utils'

import Concert from './concert';



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
})


describe("concert component", () => {
    it('renders concert list component', () => {

        // const mocked2 = mocked(useLocation, true);
        console.log(mocked(useLocation));


      const history = createMemoryHistory()
      const { container, getByText } = render(
        <Router history={history}>
          <Concert key={"test"} name={"test"} />
        </Router>
      )

      const linkElement = getByText(/title/);
      expect(linkElement).toBeInTheDocument();
    });
});
