import React, { FC, ReactElement, useState } from 'react';
import styled from 'styled-components';
import { useMutation } from 'react-query';
import { useReadConcertByTitle } from './ConcertSearch';
import { ConcertProperty } from './InputData';
import { createArtist } from './api/concert';

const Contents = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
`;

export interface ArtistProperty {
  id?: string;
  name: string;
  genre: string;
  description: string;
  concerts: (string| undefined)[];
}

const ArtistInputData: FC = (): ReactElement => {
  const mutation = useMutation(createArtist);

  const [name, setName] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const [concertOptions, setConcertOptions] = useState<string>('');
  const [concertOptionsByInput, setConcertOptionsByInput] = useState<string>('');

  const { data: currentConcerts } = useReadConcertByTitle(concertOptions);
  const [concertToRegister, setConcertToRegister] = useState<{id?: string, title: string}[]>([]);
  const [registeredConcerts, setRegisteredConcerts] = useState<{id?: string, title: string}[]>([]);

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
          <form onSubmit={(event) => {
            event.preventDefault();
            setConcertOptions(concertOptionsByInput);
          }}
          >
            <label htmlFor="concert-search">
              concert search
              <input
                id="concert-search"
                value={concertOptionsByInput}
                onChange={({ target: { value } }) => {
                  setConcertOptionsByInput(value);
                }}
              />
            </label>
            <button
              type="submit"
            >
              search
            </button>
          </form>
          <div data-testid="concert-list-from-artist">
            <div role="list">
              {currentConcerts?.map((concert: ConcertProperty) => (
                <div key={concert.id} role="listitem">
                  <input
                    type="checkbox"
                    checked={
                      registeredConcerts.map((checkedConcert) => checkedConcert.id).includes(concert.id)
                      || concertToRegister.map((checkedConcert) => checkedConcert.id).includes(concert.id)
                    }
                    value={concert.id}
                    onChange={({ target: { value } }) => {
                      if (registeredConcerts.map((checkedConcert) => checkedConcert.id).includes(concert.id)
                          || concertToRegister.map((checkedConcert) => checkedConcert.id).includes(concert.id)) {
                        setConcertToRegister((prev) => prev.filter((item) => item.id !== concert.id));
                        return;
                      }
                      const currentConcertToRegister = { title: concert.title, id: value };
                      setConcertToRegister((prev) => [...prev, currentConcertToRegister]);
                    }}
                  />
                  <span>{concert.title}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="button"
              style={{
                width: '20%', border: '1px solid salmon', borderRadius: '4px', background: 'white',
              }}
              onClick={() => {
                setRegisteredConcerts(() => concertToRegister);
                setConcertToRegister(() => []);
              }}
            >
              register
            </button>
          </div>
          <div style={{
            border: '1px solid lightskyblue', borderRadius: '4px', display: 'flex', flexDirection: 'column',
          }}
          >
            <span style={{ fontWeight: 'bolder' }}>추가 예정 공연</span>
            <div>
              {registeredConcerts.map((concert) => (
                <div key={concert.id} style={{ display: 'flex' }}>
                  <span>{concert.title}</span>
                  <button
                    onClick={() => {
                      setRegisteredConcerts((prev) => prev.filter((prevConcert) => prevConcert.id !== concert.id));
                    }}
                    type="button"
                  >
                    delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            mutation.mutate({
              name, genre, description, concerts: registeredConcerts.map((registeredConcert) => registeredConcert.id),
            });
            setName('');
            setDescription('');
            setGenre('');
            setRegisteredConcerts(() => []);
            setConcertToRegister(() => []);
          }}
          type="button"
          style={{
            marginTop: '5px',
            height: '20px',
            width: '20%',
            borderRadius: '4px',
            border: '1px solid coral',
            background: 'white',
            fontSize: '12px',
          }}
        >
          submit
        </button>
      </Contents>
    </div>
  );
};

export default ArtistInputData;
