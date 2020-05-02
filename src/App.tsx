import React from 'react';

import ConcertList from "./concert-list";
import Concert from "./concert";
import './App.css';


function App() {
  return (
    <div className="App">
        <ConcertList key={'uniqueKey'} />
        <Concert key={'test'} name={'test'} />
    </div>
  );
}

export default App;
