import React, {
  FC, ReactElement, useState,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ConcertProperty } from './InputData';
import ConcertLocationMap from './ConcertLocationMap';
import { readArtistsByIds } from './api/concert';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useGetArtistsByIds = (artistIds: (string | undefined)[]) => useQuery(['artist_ids', artistIds], () => readArtistsByIds(artistIds));

interface AvailableArtistsProps {
  artistIds: (string | undefined)[];
}

const AvailableArtists: FC<AvailableArtistsProps> = ({ artistIds }: AvailableArtistsProps) => {
  const { data: artists } = useGetArtistsByIds(artistIds);

  const { push } = useHistory();

  return (
    <div style={{
      border: '1px solid lightgray', borderRadius: '4px', display: 'flex', flexDirection: 'column',
    }}
    >
      <span style={{ fontWeight: 'bolder', marginLeft: '5px' }}>Artist List</span>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {artists?.map((artist) => (
          <button
            type="button"
            key={artist.id}
            onClick={() => {
              push(`/search-artist/${artist.id}`);
            }}
            style={{
              marginLeft: '5px',
              border: '1px solid lightskyblue',
              borderRadius: '4px',
              background: 'white',
              width: '20%',
            }}
          >
            {artist.name}
          </button>
        ))}
      </div>
    </div>
  );
};

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
      {detailData?.artists && detailData?.artists.length > 0 && <AvailableArtists artistIds={detailData.artists} />}
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
