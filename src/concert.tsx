import React, { useEffect } from 'react';

function Concert() {
  const title = 'cult of luna';
  const price = 10000;

  useEffect(() => {
      const { kakao } = window;
      const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
      const options = { //지도를 생성할 때 필요한 기본 옵션
          center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
          level: 3 //지도의 레벨(확대, 축소 정도)
      };

      const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  }, [])

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
