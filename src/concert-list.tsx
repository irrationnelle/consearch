import React, { useEffect }  from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Route, Link, useRouteMatch } from "react-router-dom";

import Concert from './concert';
import { concertsSelector } from './selectors'

interface ConcertType {
    id: string;
    title: string;
    artist: string;
    address: string;
    price: number;
}

function ConcertList() {
   const dispatch = useDispatch();
   const match = useRouteMatch();
   //const [ concerts, setConcerts ] = useState<Concert[]>([]);
   const concerts = useSelector(concertsSelector);

   useEffect(() => {
       dispatch({type: "REQ_CONCERTS"})
   }, [dispatch])

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
                          concerts.map((concert: ConcertType, index: number) => (
                              <div key={index}>
                                  <Link to={
                                      {
                                          pathname: `${match.url}/${concert.id}`,
                                          state: { title: concert.title, price: concert.price }
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

export default ConcertList;
