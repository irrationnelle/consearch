import React, { useEffect, useState } from 'react';
import { ConcertProperty } from './InputData';

const EXAMPLE_DATA = {
  title: '마스토돈',
  artist: '마스토돈',
  stage: '롤링홀',
  address: '서울 마포구 어울마당로 35',
  genre: 'rockmetal',
  date: '2021-06-26-20:00',
  coverImage: '',
};

const SECOND_EXAMPLE_DATA = {
  title: '라니아 공연',
  artist: '라니아',
  stage: 'FF',
  address: '서울 마포구 어울마당로 37',
  genre: '인디락',
  date: '2021-07-20-20:00',
  coverImage: '',
};

const ReadConcerts = () => {
  const [concerts, setConcerts] = useState<ConcertProperty[]>([]);

  useEffect(() => {
    setConcerts((prev) => [...prev, EXAMPLE_DATA, SECOND_EXAMPLE_DATA]);
  }, []);

  return (
    <div data-testid="read-concerts">
      <div role="list">
        {concerts.map((concert) => (
          <div key={concert.title} role="listitem">
            <span>{concert.title}</span>
            <span>{concert.artist}</span>
            <span>{concert.genre}</span>
            <span>{concert.address}</span>
            <span>{concert.date}</span>
            <span>{concert.stage}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadConcerts;
