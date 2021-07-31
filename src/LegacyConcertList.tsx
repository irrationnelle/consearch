import React, {
  ReactElement, useEffect, useState,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Link, useRouteMatch } from 'react-router-dom';

import Concert from './Concert';
import { concertsSelector } from './selectors';
import { Concert as ConcertType } from './@models/concert';

interface IndividualConcertProps {
    url: string;
    concert: ConcertType
}

// eslint-disable-next-line max-len
const IndividualConcert: React.FC<IndividualConcertProps> = ({ url, concert }: IndividualConcertProps): ReactElement => (
  <div>
    <Link to={url}>
      {concert.title}
    </Link>
    <br />
    {concert.price}
    {concert?.artists[0]?.name}
    {concert?.artists[0]?.genre}
    {concert.time}
    {concert.date}
  </div>
);

const LegacyConcertList: React.FC = (): ReactElement => {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const concerts = useSelector(concertsSelector);

  const [genre, setGenre] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(null);

  useEffect(() => {
    dispatch({ type: 'concerts/read', payload: { id: 1 } });
  }, [dispatch]);

  return (
    <div>
      <span>filter</span>
      <select>
        <option>genre</option>
        <option>price</option>
      </select>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (genre) {
            dispatch({ type: 'concerts/addGenre', payload: { genre } });
            dispatch({ type: 'concerts/addDate', payload: { date } });
            setGenre(null);
            setDate(null);
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
            {concerts.map((concert: ConcertType) => (<IndividualConcert key={concert.id} url={`${match.url}/${concert.id}`} concert={concert} />))}
          </div>
        </div>
      </Route>
    </div>
  );
};

export default LegacyConcertList;
