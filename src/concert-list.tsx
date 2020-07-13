import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Link, useRouteMatch } from "react-router-dom";

import Concert from "./concert";
import { concertsSelector } from "./selectors";
import {Concert as ConcertType} from "./@models/concert";

function ConcertList() {
    const dispatch = useDispatch();
    const match = useRouteMatch();
    const concerts = useSelector(concertsSelector);

    const [genres, setGenres] = useState<string[]>([])
    const [genre, setGenre] = useState<string | null>(null)

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
            <form onSubmit={() => {
                if(!!genre) {
                    setGenres([...genres, genre]);
                    setGenre(null);
                }
            }}
                  data-testid="form-add-genre"
            >
                <input
                    aria-label="concert-genre"
                    onChange={(event) => {
                        event.preventDefault();
                        setGenre(event.currentTarget.value);
                    }}
                />
                <input type="submit" value="Add Genre" />
            </form>
            <span>concert list</span>
            <Route path={match.path + "/:nameOfConcert"} component={Concert} />
            <Route exact path={match.path}>
                <div>
                    <div>
                        {concerts.filter((concert: ConcertType) =>
                             genres.length === 0 ||
                                concert.artists.filter(artist => genres.includes(artist.genre)).length > 0
                        ).map((concert: ConcertType, index: number) => (
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
                                {concert?.artists[0]?.name}
                                {concert?.artists[0]?.genre}
                                {concert.time}
                                {concert.date}
                            </div>
                        ))}
                    </div>
                </div>
            </Route>
        </div>
    );
}

export default ConcertList;
