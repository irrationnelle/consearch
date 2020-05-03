import React, { useState, useEffect }  from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

import Concert from './concert';

function ConcertList() {
   const match = useRouteMatch();
   const title = 'concert list';
   const [concerts, setConcerts] = useState(['megadeth, cult of luna']);

   useEffect(() => {
       setConcerts(['killSwitch Engage', 'amenra']);

       console.log('%cmatch: ', 'background: white; color: red;', match);
   }, [])

  return (
        <div>
              <Route
                path={match.path + '/:nameOfConcert'}
                component={Concert}
              />
              <Route
                exact
                path={match.path}
              >
                  <div>
                      <div>concert list</div>
                      <div>{
                          concerts.map(concert => (
                              <div>
                                  <Link to={
                                      {
                                          pathname: `${match.url}/${concert}`,
                                          state: { test: concert }
                                      }
                                    }
                                  >
                                    {concert}
                                  </Link><br/>
                              </div>)
                            )
                      }
                      </div>
                  </div>
              </Route>
        </div>
  );
}

export default ConcertList;
