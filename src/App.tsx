import React, { useEffect } from 'react';
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
    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.type = 'text/javascript';
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&autoload=false`;
        document.head.appendChild(script);

        script.onload = () => {
            const { kakao } = window;
            kakao.maps.load(() => {
                const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
                const options = {
                    //지도를 생성할 때 필요한 기본 옵션
                    center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
                    level: 3 //지도의 레벨(확대, 축소 정도)
                };

                // const map = new kakao.maps.Map(container, options);
            });
        };
    }, []);

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
