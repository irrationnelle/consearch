import React, { ReactElement } from 'react';
import { useQuery } from 'react-query';
import { readConcertApi } from './api/concert';
import { ConcertProperty } from './InputData';

const ReadConcerts = (): ReactElement => {
  const { data: concerts } = useQuery<ConcertProperty[]>('readConcerts', readConcertApi);

  return (
    <div data-testid="read-concerts">
      <div role="list">
        {concerts?.map((concert) => (
          <div key={concert.title} role="listitem">
            <span>{concert.title}</span>
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

export default ReadConcerts;
