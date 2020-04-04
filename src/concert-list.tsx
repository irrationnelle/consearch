import React from 'react';

function ConcertList() {
   const title = 'concert list';
   const concerts = ['megadeth, cult of luna'];

   
  return (
    <div className="ConcertList">
        <span>{title}</span>
    </div>
  );
}

export default ConcertList;
