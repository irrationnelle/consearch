import React, {
  ReactElement, useEffect, useState, useMemo,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Link, useRouteMatch } from 'react-router-dom';

import Concert from './Concert';
import { concertsSelector } from './selectors';
import { Concert as ConcertType } from './@models/concert';

const ConcertList: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const concerts = useSelector(concertsSelector);

  const [genres, setGenres] = useState<string[]>([]);
  const [genre, setGenre] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    dispatch({ type: 'REQ_CONCERTS', payload: { id: 1 } });
  }, [dispatch]);

  // eslint-disable-next-line max-len
  const concertsWithGenre = useMemo(() => concerts.filter((concert: ConcertType) => genres.length === 0
          || concert.artists.filter((artist) => genres.includes(artist.genre)).length > 0)
    .filter((concert) => (date ? concert.date === date : true)), [concerts, genres, date]);

  return (
    <div>
      <span>filter</span>
      <select>
        <option>genre</option>
        <option>price</option>
      </select>
      <form
        onSubmit={() => {
          if (genre) {
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
        <input
          aria-label="concert-date"
          onChange={(event) => {
            event.preventDefault();
            setDate(event.currentTarget.value);
          }}
        />
        <input type="submit" value="Add Genre" />
      </form>
      <span>concert list</span>
      <Route path={`${match.path}/:nameOfConcert`} component={Concert} />
      <Route exact path={match.path}>
        <div>
          <div>
            {concertsWithGenre.map((concert: ConcertType) => (
              <div key={concert.id}>
                <Link
                  to={{
                    pathname: `${match.url}/${concert.id}`,
                    state: {
                      title: concert.title,
                      price: concert.price,
                      address: concert.address,
                    },
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
};

export default ConcertList;
