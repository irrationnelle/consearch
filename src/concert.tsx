import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { History, Location } from 'history';

import ConcertLocationMap from './ConcertLocationMap';

const Concert: React.FC<{ key: string; name?: string }> = (): ReactElement => {
  const history: History = useHistory();

  const {
    state: { title, price },
  }: Location<{ title: string; price: number }> = useLocation();

  const [points, setPoints] = useState({ x: 33.450701, y: 126.570667 });
  const [address, setAddress] = useState('제주특별자치도 제주시 첨단로 242');

  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    setPoints({ x: 37.54839846253257, y: 126.92007036208365 });

    const timeout = setTimeout(() => {
      setAddress('서울특별시 마포구 서교동 홍익로 25');
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

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
      <ConcertLocationMap points={points} address={address} />
    </div>
  );
};

export default Concert;
