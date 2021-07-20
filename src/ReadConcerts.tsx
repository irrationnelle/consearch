import React, { useEffect } from 'react';

const ReadConcerts = () => {
  useEffect(() => {
    console.log('hello');
  }, []);

  return (
    <div data-testid="read-concerts">
      <div role="list">
        <div role="listitem">
          <span>마스토돈</span>
          <span>마스토돈</span>
          <span>rockmetal</span>
          <span>롤링홀</span>
          <span>서울 마포구 어울마당로 35</span>
          <span>2021-06-26-20:00</span>
        </div>
        <div role="listitem">
          <span>라니아</span>
          <span>라니아 공연</span>
          <span>인디락</span>
          <span>FF</span>
          <span>서울 마포구 어울마당로 37</span>
          <span>2021-07-20-20:00</span>
        </div>
      </div>
    </div>
  );
};

export default ReadConcerts;
