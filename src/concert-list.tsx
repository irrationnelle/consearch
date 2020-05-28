import React, { useState, useEffect }  from 'react';
import { connect, useSelector } from 'react-redux'
import { Route, Link, useRouteMatch} from "react-router-dom";

import Concert from './concert';
import { getSelector } from './selectors'
import { getConcerts } from './fakeApi';

interface ConcertJson {
    title: string;
    id: number;
}

type ConcertJsonList = ConcertJson[];

function ConcertList(props: any) {
   const match = useRouteMatch();
   const [ concerts, setConcerts ] = useState<ConcertJsonList>([]);
   const exampleConcerts = useSelector(getSelector);

   useEffect(() => {
       //const exampleConcerts: ConcertJsonList = useSelector(getSelector);
       console.log(exampleConcerts);
       //setConcerts(exampleConcerts.concerts);

       props.onTodoClick("rase");
   }, [])

  return (
        <div>
             <span>concert list</span>
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
                          exampleConcerts.concerts.map((concert, index) => (
                              <div key={index}>
                                  <Link to={
                                      {
                                          pathname: `${match.url}/${concert.id}`,
                                          state: { title: concert.title }
                                      }
                                    }
                                  >
                                    {concert.title}
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
    concerts: getSelector(state)
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
      onTodoClick: (id: string) => dispatch({type: "USER_FETCH_REQUESTED", payload: id})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConcertList);
