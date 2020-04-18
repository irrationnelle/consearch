import React from 'react';
import { render } from '@testing-library/react';
import ConcertLocationMap from './ConcertLocationMap';

test('renders concert list component', () => {
    const component  = render(<ConcertLocationMap/>);
    expect(component).toBeInTheDocument();
});

