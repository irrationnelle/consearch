import React, { FC, ReactElement, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ConcertProperty } from './InputData';
import ConcertLocationMap from './ConcertLocationMap';

interface ConcertDetailProps {
  concerts?: ConcertProperty[];
}

const ConcertDetail: FC<ConcertDetailProps> = ({ concerts: currentConcerts }: ConcertDetailProps): ReactElement => {
  const history = useHistory();
  const { concertId } = useParams() as {concertId: string};

  const detailData = currentConcerts?.filter((concert) => concert.id === concertId)[0];

  const [addressPosition, setAddressPosition] = useState<{x: number, y: number}>({ x: -1, y: -1 });

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
    }}
    >
      <button type="button" onClick={() => { history.goBack(); }} style={{ width: '10%' }}>
        back
      </button>
      <span>{detailData?.title}</span>
      <span>{detailData?.artist}</span>
      <a href={`https://map.kakao.com/link/map/${addressPosition.y},${addressPosition.x}`}>{detailData?.address}</a>
      <ConcertLocationMap address={detailData?.address ?? '서울시 마포구 어울마당로 35'} setPos={setAddressPosition} />
      <span>{detailData?.date}</span>
      <span>{detailData?.genre}</span>
      <span>{detailData?.price}</span>
      <span>{detailData?.stage}</span>

    </div>
  );
};

export default ConcertDetail;
