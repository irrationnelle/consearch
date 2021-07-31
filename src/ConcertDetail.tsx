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
      {detailData?.artists && detailData?.artists.length > 0 && (
      <div style={{
        border: '1px solid coral', borderRadius: '4px', display: 'flex', flexDirection: 'column',
      }}
      >
        <span style={{ fontWeight: 'bolder' }}>Artist List</span>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {detailData.artists.map((item) => <span key={item}>{item}</span>)}
        </div>
      </div>
      )}
      <a href={`https://map.kakao.com/link/map/${addressPosition.y},${addressPosition.x}`}>{detailData?.address}</a>
      <ConcertLocationMap address={detailData?.address ?? ''} setPos={setAddressPosition} />
      <span>{detailData?.date}</span>
      <span>{detailData?.genre}</span>
      <span>{detailData?.price}</span>
      <span>{detailData?.stage}</span>

    </div>
  );
};

export default ConcertDetail;
