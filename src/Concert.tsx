import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { History, Location } from 'history';

import ConcertLocationMap from './ConcertLocationMap';


const Concert: React.FC = (): ReactElement => {
  const history: History = useHistory();

  const {
    state: { title, price, address },
  }: Location<{ title: string; price: number; address: string; }> = useLocation();


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
