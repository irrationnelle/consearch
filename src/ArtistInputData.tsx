import React, { FC, ReactElement, useState } from 'react';
import styled from 'styled-components';
import ConcertSearch from './ConcertSearch';

const Contents = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
  position: relative;
`;

const ArtistInputData: FC = (): ReactElement => {
  const [name, setName] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  return (
    <div style={{
      height: '100%',
    }}
    >
      <Contents>
        <label htmlFor="name-input">
          name-input
          <input
            id="name-input"
            value={name}
            onChange={({ target: { value } }) => {
              setName(value);
            }}
          />
        </label>
        <label htmlFor="genre-input">
          genre-input
          <input
            id="genre-input"
            value={genre}
            onChange={({ target: { value } }) => {
              setGenre(value);
            }}
          />
        </label>
        <label htmlFor="description-input">
          description-input
          <input
            id="description-input"
            value={description}
            onChange={({ target: { value } }) => {
              setDescription(value);
            }}
          />
        </label>
        <div style={{
          border: '1px solid coral', width: '100%', height: '50%', display: 'flex', flexDirection: 'column',
        }}
        >
          <ConcertSearch />
        </div>
      </Contents>
    </div>
  );
};

export default ArtistInputData;
