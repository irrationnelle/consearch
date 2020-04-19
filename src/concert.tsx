import React, { useEffect, useState } from 'react';
import ConcertLocationMap from "./ConcertLocationMap";

function Concert() {
  const title = 'cult of luna';
  const price = 10000;
  const [points, setPoints] = useState({x: 33.450701, y: 126.570667});

  useEffect(() => {
      setPoints({x: 37.54839846253257, y: 126.92007036208365});
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
        <ConcertLocationMap points={points} />
    </div>
  );
}

export default Concert;
