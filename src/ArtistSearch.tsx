import React, { ReactElement, useState } from 'react';
import { useQuery } from 'react-query';
import {
  Route, useHistory, useRouteMatch,
} from 'react-router-dom';
import ArtistList from './ArtistList';
import ArtistDetail from './ArtistDetail';
import { readArtistsApiBySearch } from './api/concert';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useSearchArtists = (artistOption: string) => useQuery(['artist_search', artistOption], () => readArtistsApiBySearch(artistOption));

const ArtistSearch = (): ReactElement => {
  const { path } = useRouteMatch();
  const history = useHistory();

  const [artistOptionByInput, setArtistOptionByInput] = useState<string>('');
  const [artistOption, setArtistOption] = useState<string>('');

  const { data: artists } = useSearchArtists(artistOption);

  return (
    <div
      data-testid="artist-search"
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <form onSubmit={(event) => {
        event.preventDefault();
        history.push('/search-artist');
        setArtistOption(artistOptionByInput);
      }}
      >
        <label htmlFor="artist-search">
          artist search
          <input
            id="artist-search"
            value={artistOptionByInput}
            onChange={({ target: { value } }) => {
              setArtistOptionByInput(value);
            }}
          />
        </label>
        <button
          type="submit"
        >
          search
        </button>
      </form>
      <Route exact path={path} render={() => <ArtistList artists={artists} />} />
      <Route path={`${path}/:artistId`} render={() => <ArtistDetail artists={artists} />} />
    </div>
  );
};

export default ArtistSearch;
