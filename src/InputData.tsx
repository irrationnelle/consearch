import React, { FC, ReactElement, useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { createConcert } from './api/concert';

export interface ConcertProperty {
  title: string;
  artist: string;
  stage: string;
  address: string;
  genre: string;
  date: string;
  coverImage?: string;
}

const Contents = styled.div`
    display: flex;
    flex-direction: column;
`;

const InputData: FC = (): ReactElement => {
  const mutation = useMutation(createConcert);

  const [title, setTitle] = useState<string>('');
  const [artist, setArtist] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [stage, setStage] = useState<string>('');
  const [date, setDate] = useState<string>('');

  return (
    <div>
      <Contents>
        <label htmlFor="title-input">
          title-input
          <input
            id="title-input"
            value={title}
            onChange={({ target: { value } }) => {
              setTitle(value);
            }}
          />
        </label>
        <label htmlFor="artist-input">
          artist-input
          <input
            id="artist-input"
            value={artist}
            onChange={({ target: { value } }) => {
              setArtist(value);
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
        <label htmlFor="date-input">
          date-input
          <input
            id="date-input"
            value={date}
            onChange={({ target: { value } }) => {
              setDate(value);
            }}
          />
        </label>
        <label htmlFor="address-input">
          address-input
          <input
            id="address-input"
            value={address}
            onChange={({ target: { value } }) => {
              setAddress(value);
            }}
          />
        </label>
        <label htmlFor="stage-input">
          stage-input
          <input
            id="stage-input"
            value={stage}
            onChange={({ target: { value } }) => {
              setStage(value);
            }}
          />
        </label>
      </Contents>
      <div>
        <button
          type="button"
          disabled={!(title && artist && genre && stage && address && date)}
          onClick={() => {
            mutation.mutate({
              title, artist, genre, stage, address, date,
            });
            setTitle('');
            setArtist('');
            setAddress('');
            setDate('');
            setGenre('');
            setStage('');
          }}
        >
          Submit
        </button>
      </div>
      {mutation.isSuccess
        && (
        <Contents>
          <span aria-label="title">{mutation.data?.title}</span>
          <span aria-label="artist">{mutation.data?.artist}</span>
          <span aria-label="genre">{mutation.data?.genre}</span>
          <span aria-label="date">{mutation.data?.date}</span>
          <span aria-label="address">{mutation.data?.address}</span>
          <span aria-label="stage">{mutation.data?.stage}</span>
        </Contents>
        )}
    </div>
  );
};

export default InputData;
