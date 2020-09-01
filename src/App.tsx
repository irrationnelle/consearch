import React, { ReactElement } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Link,
} from 'react-router-dom';

import ConcertList from './ConcertList';
import './App.css';

const App: React.FC = (): ReactElement => (
  <Router>
    <div>
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
    </div>
  </Router>
);

export default App;
