import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

import ConcertList from "./concert-list";
import Concert from "./concert"
import './App.css';

function App() {
  return (
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
    </Router>);
}

export default App;
