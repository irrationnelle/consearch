import React from 'react';

function Concert() {
  const title = 'cult of luna';
  const price = 10000;

  return (
    <div>
        <div>
          <span>title</span>
          <span>{title}</span>
        </div>
        <div>
          <span>price</span>
          <span>{price}</span>
        </div>
        <div id="map" style={{width: '500px', height:'400px'}}></div>
    </div>
  );
}

export default Concert;
