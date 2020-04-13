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
    </div>
  );
}

export default Concert;
