import React, { useEffect, useState } from 'react';

import ConcertLocationMap from "./ConcertLocationMap";

function Concert(props: {key: string; name: string;}) {
  const title = props.name;
  const price = 10000;
  const [points, setPoints] = useState({x: 33.450701, y: 126.570667});
  const [address, setAddress] = useState('제주특별자치도 제주시 첨단로 242');

  useEffect(() => {
      setPoints({x: 37.54839846253257, y: 126.92007036208365});

      setTimeout(() => {
          setAddress('서울특별시 마포구 서교동 홍익로 25');
      }, 1500);
      }, [])

  return (
    <div>
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
}

export default Concert;
