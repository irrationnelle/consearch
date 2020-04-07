import React from 'react';

function ConcertList() {
   const title = 'concert list';
   const concerts = ['megadeth, cult of luna'];

   
  return (
      <div>
          <div className="ConcertList">
            <span>{title}</span>
          </div>
          <div>
              {concerts.map(concert => (<span key={concert}>{concert}</span>))}
          </div>
      </div>
  );
}

export default ConcertList;
