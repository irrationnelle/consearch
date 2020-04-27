import React, { useState, useEffect }  from 'react';
import Concert from './concert';

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
              {concerts.map(concert => (<Concert key={concert} name={concert} />))}
          </div>
      </div>
  );
}

export default ConcertList;
