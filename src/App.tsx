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
        <ul>
          <li>
            <Link to="/">Main</Link>
          </li>
          <li>
            <Link to="/concerts">Concerts</Link>
          </li>
        </ul>

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
`;

const AppWrapper = styled.div`
    width: 50%;
    height: 100%;
    border: 1px solid black;
    padding-right: 8px;
    padding-left: 8px;
`;

export default App;
