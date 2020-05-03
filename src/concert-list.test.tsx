import React from 'react';
import { render, fireEvent} from '@testing-library/react';
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import '@testing-library/jest-dom/extend-expect'

import ConcertList from './concert-list';

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

    it('activate route', () => {
        const location = {x: 0, y: 0};

    })
});

