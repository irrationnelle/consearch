import React, { FC, ReactElement } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { ArtistProperty } from './ArtistInputData';
import { readConcertsByIds } from './api/concert';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useGetConcertsByIds = (concertIds: (string | undefined)[]) => useQuery(['concert_ids', concertIds], () => readConcertsByIds(concertIds));

interface AvailableConcertsProps {
  concertIds: (string | undefined)[];
}

const AvailableConcerts: FC<AvailableConcertsProps> = ({ concertIds }: AvailableConcertsProps) => {
  const { data: concerts } = useGetConcertsByIds(concertIds);

  const { push } = useHistory();

  return (
    <div style={{
      border: '1px solid lightgray', borderRadius: '4px', display: 'flex', flexDirection: 'column',
    }}
    >
      <span style={{ fontWeight: 'bolder', marginLeft: '5px' }}>Artist List</span>
      <div style={{ display: 'flex' }}>
        {concerts?.map((concert) => (
          <button
            type="button"
            key={concert.id}
            onClick={() => {
              push(`/search-concert/${concert.id}`);
            }}
            style={{
              marginLeft: '5px',
              marginRight: '5px',
              border: '1px solid lightskyblue',
              borderRadius: '4px',
              background: 'white',
            }}
          >
            {concert.title}
          </button>
        ))}
      </div>
    </div>
  );
};

interface ArtistDetailProps {
    artists?: ArtistProperty[];
}

const ArtistDetail: FC<ArtistDetailProps> = ({ artists }: ArtistDetailProps): ReactElement => {
  const history = useHistory();
  const { artistId } = useParams() as {artistId: string};

  const detailData = artists?.filter((artist) => artist.id === artistId)[0];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
    }}
    >
      <button
        type="button"
        onClick={() => { history.goBack(); }}
        style={{
          width: '50px', borderRadius: '4px', border: '1px solid lightgray', background: 'white',
        }}
      >
        back
      </button>
      <span>{detailData?.name}</span>
      <span>{detailData?.genre}</span>
      <span>{detailData?.description}</span>
      {detailData?.concerts && detailData?.concerts.length > 0 && <AvailableConcerts concertIds={detailData.concerts} />}
    </div>
  );
};

export default ArtistDetail;
