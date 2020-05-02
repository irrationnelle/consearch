import React from 'react';
import { render } from '@testing-library/react';

import ConcertLocationMap from './ConcertLocationMap';

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
})

test('renders concert list component', () => {
    const component  = render(<ConcertLocationMap points={{x: 1,  y: 2}} address={'test'}/>);
    expect(component).not.toBeNull();
});

