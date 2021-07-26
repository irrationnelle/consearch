import React, { ReactElement, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, Route, useRouteMatch } from 'react-router-dom';
import { readConcertApi, readSingleConcertApiByTitle } from './api/concert';
import { ConcertProperty } from './InputData';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useReadConcertByTitle = (title: string) => useQuery(['title', title], () => readSingleConcertApiByTitle(title));

const ReadConcerts = (): ReactElement => {
  const { data: concerts } = useQuery<ConcertProperty[]>('readConcerts', readConcertApi);

  const [title, setTitle] = useState<string>('');
  const [currentTitle, setCurrentTitle] = useState<string>('');

  const { data: searchedConcerts } = useReadConcertByTitle(currentTitle);

  const currentConcerts = searchedConcerts?.length === 0 ? concerts : searchedConcerts;

  const { url } = useRouteMatch();

  return (
    <div data-testid="read-concerts">
      <form onSubmit={(event) => {
        event.preventDefault();
        setCurrentTitle(title);
      }}
      >
        <label htmlFor="title-search">
          title-search
          <input
            id="title-search"
            value={title}
            onChange={({ target: { value } }) => {
              setTitle(value);
            }}
          />
        </label>
        <button
          type="submit"
        >
          search
        </button>
      </form>
      <div role="list">
        {currentConcerts?.map((concert: ConcertProperty) => (
          <div key={concert.title} role="listitem">
            <Link to={`${url}/${concert.id ?? concert.title}`}>{concert.title}</Link>
            <span>{concert.artist}</span>
            <span>{concert.genre}</span>
            <span>{concert.address}</span>
            <span>{concert.date}</span>
            <span>{concert.stage}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ReadConcert = (): ReactElement => (
  <div>
    <span>hello</span>
  </div>
);

const ReadConcertRouter = (): ReactElement => {
  const { path } = useRouteMatch();

  return (
    <>
      <Route exact path={path} component={ReadConcerts} />
      <Route path={`${path}/:concertId`} component={ReadConcert} />
    </>
  );
};

export default ReadConcertRouter;
