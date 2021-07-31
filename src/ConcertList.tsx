import React, { FC, ReactElement } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { ConcertProperty } from './InputData';

interface ConcertListProps {
    concerts?: ConcertProperty[];
}

const ConcertList: FC<ConcertListProps> = ({ concerts: currentConcerts }: ConcertListProps): ReactElement => {
  const { url } = useRouteMatch();

  return (
    <div data-testid="concert-list">
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

export default ConcertList;
