import React, { ReactElement, useState } from 'react';
import { useQuery } from 'react-query';
import {
  Route, useHistory, useRouteMatch,
} from 'react-router-dom';
import { readConcertApi, readSingleConcertApiByTitle } from './api/concert';
import { ConcertProperty } from './ConcertInputData';
import ConcertList from './ConcertList';
import ConcertDetail from './ConcertDetail';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useReadConcertByTitle = (title: string) => useQuery(['title', title], () => readSingleConcertApiByTitle(title));

const ConcertSearch = (): ReactElement => {
  const { path } = useRouteMatch();
  const history = useHistory();

  const { data: concerts } = useQuery<ConcertProperty[]>('readConcerts', readConcertApi);

  const [title, setTitle] = useState<string>('');
  const [currentTitle, setCurrentTitle] = useState<string>('');

  const { data: searchedConcerts } = useReadConcertByTitle(currentTitle);

  const currentConcerts = searchedConcerts?.length === 0 ? concerts : searchedConcerts;

  return (
    <div
      data-testid="concert-search"
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <form onSubmit={(event) => {
        event.preventDefault();
        history.push('/search-concert');
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
      <Route exact path={path} render={() => <ConcertList concerts={currentConcerts} />} />
      <Route path={`${path}/:concertId`} render={() => <ConcertDetail concerts={currentConcerts} />} />
    </div>
  );
};

export default ConcertSearch;
