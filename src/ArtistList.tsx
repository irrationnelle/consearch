import React, { FC, ReactElement } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { ArtistProperty } from './ArtistInputData';

interface ArtistListProps {
    artists?: ArtistProperty[];
}

const ArtistList: FC<ArtistListProps> = ({ artists }: ArtistListProps): ReactElement => {
  const { url } = useRouteMatch();

  return (
    <div data-testid="artist-list">
      <div role="list">
        {artists?.map((artist) => (
          <div key={artist.id} role="listitem" style={{ display: 'flex' }}>
            <Link to={`${url}/${artist.id ?? artist.name}`}>{artist.name}</Link>
            <span style={{ marginLeft: '5px' }}>{artist.genre}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistList;
