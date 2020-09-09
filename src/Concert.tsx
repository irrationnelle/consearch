import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { History } from 'history';

import { concertSelector } from './selectors';
import ConcertLocationMap from './ConcertLocationMap';

export const path = (url: string) => {
  const fixedPath: string = url.endsWith('/')
    ? path(url.substring(0, url.length - 1))
    : url;

  return fixedPath;
};


const Concert: React.FC = (): ReactElement => {
  const history: History = useHistory();
  const match = useRouteMatch();

  const concertId = parseInt(match.url.replace('/', '').replace('/', ''), 10);

  console.log('match', match);

  const { title, price, address } = useSelector(concertSelector(concertId));

  const goBack = () => {
    history.goBack();
  };

  return (
    <div>
      <button type="button" onClick={goBack}>back</button>
      <div>
        <span>title</span>
        <span>{title}</span>
      </div>
      <div>
        <span>price</span>
        <span>{price}</span>
      </div>
      <ConcertLocationMap address={address} />
    </div>
  );
};

export default Concert;
