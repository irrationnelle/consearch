import React, { FC, ReactElement } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';
import styled from 'styled-components';

import ConcertList from './ConcertList';

const App: FC = (): ReactElement => (
  <Wrapper>
    <Router>
      <AppWrapper>
        <HeaderNav>
          <div>
            <Link to="/">Main</Link>
          </div>
          <div>
            <Link to="/concerts">Concerts</Link>
          </div>
          <div>Artists</div>
          <div>Today Pick</div>
        </HeaderNav>

        <Switch>
          <Route path="/concerts">
            <ConcertList />
          </Route>
          <Route path="/">
            <div>main</div>
          </Route>
        </Switch>
      </AppWrapper>
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
