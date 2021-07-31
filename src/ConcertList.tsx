import React, { FC, ReactElement } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { ConcertProperty } from './ConcertInputData';

interface ConcertListProps {
    concerts?: ConcertProperty[];
}

const ConcertList: FC<ConcertListProps> = ({ concerts: currentConcerts }: ConcertListProps): ReactElement => {
  const { url } = useRouteMatch();

  return (
    <div data-testid="concert-list">
      <div role="list">
        {currentConcerts?.map((concert: ConcertProperty) => (
          <div
            key={concert.title}
            role="listitem"
            style={{
              display: 'flex', border: '1px solid lightgray', background: 'white', marginTop: '8px', marginBottom: '8px', borderRadius: '4px',
            }}
          >
            <div style={{ marginLeft: '8px' }}>
              <Link to={`${url}/${concert.id ?? concert.title}`}>{concert.title}</Link>
            </div>
            <span style={{ marginLeft: '8px' }}>{concert.genre}</span>
            <span style={{ marginLeft: '8px' }}>{concert.stage}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConcertList;
