import React, { useState, useEffect }  from 'react';
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";

import Concert from './concert';
import { getSelector } from './selectors'

function ConcertList(props: any) {
   const match = useRouteMatch();
   const title = 'concert list';
   const [concerts, setConcerts] = useState(['megadeth, cult of luna']);

   useEffect(() => {
       setConcerts(['killSwitch Engage', 'amenra']);

       console.log('%cmatch: ', 'background: white; color: red;', match);
       console.log('%cprops: ', 'background: white; color: blue;', props);

       props.onTodoClick("rase");
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

const mapStateToProps = (state: any) => {
  return {
    counter: getSelector(state)
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
      onTodoClick: (id: string) => dispatch({type: "USER_FETCH_REQUESTED", payload: id})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConcertList);
