import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Link, useRouteMatch } from "react-router-dom";

import Concert from "./concert";
import { concertsSelector } from "./selectors";
import { Concert as ConcertType } from "./@models/concert";

function ConcertList() {
    const dispatch = useDispatch();
    const match = useRouteMatch();
    const concerts = useSelector(concertsSelector);

    useEffect(() => {
        dispatch({ type: "REQ_CONCERTS", payload: { id: 1 } });
    }, [dispatch]);

    return (
        <div>
            <span>filter</span>
            <select>
                <option>genre</option>
                <option>price</option>
            </select>
            <span>concert list</span>
            <Route path={match.path + "/:nameOfConcert"} component={Concert} />
            <Route exact path={match.path}>
                <div>
                    <div>
                        {concerts.map((concert: ConcertType, index: number) => (
                            <div key={index}>
                                <Link
                                    to={{
                                        pathname: `${match.url}/${concert.id}`,
                                        state: {
                                            title: concert.title,
                                            price: concert.price
                                        }
                                    }}
                                >
                                    {concert.title}
                                </Link>
                                <br />
                                {concert.price}
                                {concert.artist.name}
                                {concert.artist.genre}
                                {concert.timetable}
                            </div>
                        ))}
                    </div>
                </div>
            </Route>
        </div>
    );
}

export default ConcertList;
