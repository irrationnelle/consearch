import React, { FC, ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';
import styled from 'styled-components';

import LegacyConcertList from './LegacyConcertList';
import InputData from './InputData';
import InitializationProvider from './contexts/InitializationContext';
import ConcertSearch from './ConcertSearch';
import ArtistInputData from './ArtistInputData';
import ArtistSearch from './ArtistSearch';

const queryClient = new QueryClient();

const App: FC = (): ReactElement => (
  <Wrapper>
    <Router>
      <QueryClientProvider client={queryClient}>
        <InitializationProvider>
          <AppWrapper>
            <HeaderNav>
              <div>
                <Link to="/">Main</Link>
              </div>
              <div>
                <Link to="/concerts">Concerts</Link>
              </div>
              <div>Artists</div>
              <div>
                <Link to="/input">input</Link>
              </div>
              <div>
                <Link to="/search">read</Link>
              </div>
              <div>
                <Link to="/input-artist">artist-input</Link>
              </div>
              <div>
                <Link to="/search-artist">artist-search</Link>
              </div>
            </HeaderNav>

            <Switch>
              <Route path="/concerts">
                <LegacyConcertList />
              </Route>
              <Route path="/input">
                <InputData />
              </Route>
              <Route path="/search">
                <ConcertSearch />
              </Route>
              <Route path="/input-artist">
                <ArtistInputData />
              </Route>
              <Route path="/search-artist">
                <ArtistSearch />
              </Route>
            </Switch>
          </AppWrapper>
        </InitializationProvider>
      </QueryClientProvider>
    </Router>
  </Wrapper>
);

const Wrapper = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const AppWrapper = styled.div`
    width: 50%;
    height: 98%;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    padding-right: 8px;
    padding-left: 8px;
`;

const HeaderNav = styled.div`
    display: flex;
    justify-content: space-around;
`;

export default App;
