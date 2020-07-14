import React, { ReactElement } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';

import ConcertList from './concert-list';
import './App.css';

const App: React.FC = (): ReactElement => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Main</Link>
        </li>
        <li>
          <Link to="/me">MyPage</Link>
        </li>
        <li>
          <Link to="/concerts">Concerts</Link>
        </li>
      </ul>

      <Switch>
        <Route path="/me">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <div>I'm rase</div>
        </Route>
        <Route path="/concerts">
          <ConcertList />
        </Route>
        <Route path="/">
          <div>main</div>
        </Route>
      </Switch>
    </div>
  </Router>
);

export default App;
