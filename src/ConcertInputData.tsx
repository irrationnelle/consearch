import React, { FC, ReactElement, useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';
import { createConcert } from './api/concert';
import { ArtistProperty } from './ArtistInputData';
import { useSearchArtists } from './ArtistSearch';

export interface ConcertProperty {
    id?: string;
  title: string;
  artists: (string | undefined)[];
  stage: string;
  address: string;
  genre: string;
  date: string;
  price: number;
  coverImage?: string;
}

const Contents = styled.div`
    display: flex;
    flex-direction: column;
`;

const ConcertInputData: FC = (): ReactElement => {
  const mutation = useMutation(createConcert);

  const [title, setTitle] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [stage, setStage] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [price, setPrice] = useState<number>(-1);

  const [artistsToSearch, setArtistsToSearch] = useState<string>('');
  const [artistsToSearchByInput, setArtistsToSearchByInput] = useState<string>('');

  const { data: artistList } = useSearchArtists(artistsToSearch);

  const [registeredArtists, setRegisteredArtists] = useState<{id?: string; name: string}[]>([]);
  const [artistsToRegister, setArtistsToRegister] = useState<{id?: string; name: string}[]>([]);

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
        <div style={{
          border: '1px solid lightgray', width: '100%', height: '50%', display: 'flex', flexDirection: 'column',
        }}
        >
          <form onSubmit={(event) => {
            event.preventDefault();
            setArtistsToSearch(artistsToSearchByInput);
          }}
          >
            <label htmlFor="concert-search">
              artist search
              <input
                id="concert-search"
                value={artistsToSearchByInput}
                onChange={({ target: { value } }) => {
                  setArtistsToSearchByInput(value);
                }}
              />
            </label>
            <button
              type="submit"
            >
              search
            </button>
          </form>
          <div data-testid="artist-list-from-concert">
            <div role="list">
              {artistList?.map((searchedArtist: ArtistProperty) => (
                <div key={searchedArtist.id} role="listitem">
                  <input
                    type="checkbox"
                    checked={
                        registeredArtists.map((checkedArtist) => checkedArtist.id).includes(searchedArtist.id)
                        || artistsToRegister.map((checkedArtist) => checkedArtist.id).includes(searchedArtist.id)
                    }
                    value={searchedArtist.id}
                    onChange={({ target: { value } }) => {
                      if (registeredArtists.map((checkedArtist) => checkedArtist.id).includes(searchedArtist.id)
                          || artistsToRegister.map((checkedArtist) => checkedArtist.id).includes(searchedArtist.id)
                      ) {
                        setArtistsToRegister((prev) => prev.filter((item) => item.id !== searchedArtist.id));
                        return;
                      }
                      const currentArtistToRegister = { name: searchedArtist.name, id: value };
                      setArtistsToRegister((prev) => [...prev, currentArtistToRegister]);
                    }}
                  />
                  <span>{searchedArtist.name}</span>
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
                setRegisteredArtists(() => artistsToRegister);
                setArtistsToRegister(() => []);
              }}
            >
              register
            </button>
          </div>
          <div style={{
            border: '1px solid coral', borderRadius: '4px', display: 'flex', flexDirection: 'column',
          }}
          >
            <span style={{ fontWeight: 'bolder' }}>추가할 아티스트</span>
            <div>
              {registeredArtists.map((registerArtist) => (
                <div key={registerArtist.id} style={{ display: 'flex' }}>
                  <span>{registerArtist.name}</span>
                  <button
                    onClick={() => {
                      setRegisteredArtists((prev) => prev.filter((prevArtist) => prevArtist.id !== registerArtist.id));
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
        <label htmlFor="price-input">
          price-input
          <input
            id="price-input"
            type="number"
            value={price}
            onChange={({ target: { value } }) => {
              const regex = /^\d*$/;
              const isNumerical = regex.test(value);
              if (isNumerical) {
                const priceNumber = parseInt(value, 10);
                setPrice(priceNumber);
              }
            }}
          />
        </label>
      </Contents>
      <div>
        <button
          type="button"
          disabled={!(title && genre && stage && address && date && (price > 0))}
          onClick={() => {
            mutation.mutate({
              title, genre, stage, address, date, price, artists: registeredArtists.map((registeredArtist) => registeredArtist.id),
            });
            setTitle('');
            setAddress('');
            setDate('');
            setGenre('');
            setStage('');
          }}
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
      </div>
      {mutation.isSuccess
        && (
        <Contents>
          <span aria-label="title">{mutation.data?.title}</span>
          <span aria-label="genre">{mutation.data?.genre}</span>
          <span aria-label="date">{mutation.data?.date}</span>
          <span aria-label="address">{mutation.data?.address}</span>
          <span aria-label="stage">{mutation.data?.stage}</span>
          <span aria-label="price">{mutation.data?.price}</span>
        </Contents>
        )}
    </div>
  );
};

export default ConcertInputData;
