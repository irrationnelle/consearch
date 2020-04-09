import React, { useState, useEffect }  from 'react';

function ConcertList() {
   const title = 'concert list';
   const [concerts, setConcerts] = useState(['megadeth, cult of luna']);

   useEffect(() => {
       setConcerts(['killSwitch Engage', 'amenra']);
   }, [])

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
