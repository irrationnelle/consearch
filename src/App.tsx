import React from 'react';
import logo from './logo.svg';
import ConcertList from "./concert-list";
import Concert from "./concert";
import './App.css';

declare global {
    interface Window {
        kakao:any;
    }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <ConcertList/>
      <Concert/>
    </div>
  );
}

export default App;
