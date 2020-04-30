import React from 'react';
import { render } from '@testing-library/react';
import ConcertLocationMap from './ConcertLocationMap';

test('renders concert list component', () => {

    global.kakao = jest.fn().mockImplementation(()=>{
        return {maps: {
            Map: ()=>{return null;},
            LatLng: ()=>{return null;},
            services: {}
        }}
    });

    let mockLatLng = jest.fn();
    global.kakao.maps = jest.fn().mockImplementation(()=> {
        return {
            LatLng: mockLatLng
        }
        /*
        return {
            LatLng: jest.fn().mockResolvedValue(null)
        }
         */
    });


    const component  = render(<ConcertLocationMap points={{x: 1,  y: 2}}/>);
    expect(component).toBeInTheDocument();
});

