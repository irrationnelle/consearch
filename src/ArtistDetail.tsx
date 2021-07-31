import React, { FC, ReactElement } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ArtistProperty } from './ArtistInputData';

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
      <button type="button" onClick={() => { history.goBack(); }} style={{ width: '10%' }}>
        back
      </button>
      <span>{detailData?.name}</span>
      <span>{detailData?.genre}</span>
      <span>{detailData?.description}</span>
      {detailData?.concerts && detailData?.concerts.length > 0 && (
      <div style={{
        border: '1px solid coral', borderRadius: '4px', display: 'flex', flexDirection: 'column',
      }}
      >
        {detailData.concerts.map((item) => <span key={item}>{item}</span>)}
      </div>
      )}
    </div>
  );
};

export default ArtistDetail;
