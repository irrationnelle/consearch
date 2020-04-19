import React from 'react';

import ConcertList from "./concert-list";
import Concert from "./concert";
import './App.css';


function App() {
  return (
    <div className="App">
      <ConcertList/>
      <Concert/>
    </div>
  );
}

export default App;
