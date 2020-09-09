import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { concertSelector } from './selectors';
import ConcertLocationMap from './ConcertLocationMap';

export const path = (url: string): string => {
  const fixedPath: string = url.startsWith('/')
    ? path(url.substring(1))
    : url;

  return fixedPath;
};

const Concert: React.FC = (): ReactElement => {
  const { goBack } = useHistory();
  const { url } = useRouteMatch();

  const concertId = path(url);

  const { title, price, address } = useSelector(concertSelector(concertId));

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
