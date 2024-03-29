import React, { ReactElement, useEffect } from 'react';
import styled from 'styled-components';

// eslint-disable-next-line import/no-unresolved
import { CustomWindow } from './@types/custom.window';

declare let window: CustomWindow;

interface Props {
    address: string;
    setPos?: ({ x, y }: {x: number, y: number}) => void;
}

const KAKAO_MAP_SDK_URL = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;

const ConcertLocationMap: React.FC<Props> = ({ address, setPos }: Props): ReactElement => {
  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = KAKAO_MAP_SDK_URL;
    document.head.appendChild(script);

    script.onload = () => {
      const { kakao } = window;

      kakao.maps.load(() => {
        const container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스

        const geocoder = new kakao.maps.services.Geocoder();

        // 주소로 좌표를 검색합니다
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        geocoder.addressSearch(address, (result: any, status: any) => {
          // 정상적으로 검색이 완료됐으면
          if (status === kakao.maps.services.Status.OK) {
            if (setPos) {
              setPos({ x: result[0].x, y: result[0].y });
            }

            const options = {
              // 지도를 생성할 때 필요한 기본 옵션
              center: new kakao.maps.LatLng(result[0].y, result[0].x), // 지도의 중심좌표.
              level: 3, // 지도의 레벨(확대, 축소 정도)
            };

            const map = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            const marker = new kakao.maps.Marker({
              map,
              position: coords,
            });

            // // 인포윈도우로 장소에 대한 설명을 표시합니다
            // const infowindow = new kakao.maps.InfoWindow({
            // eslint-disable-next-line max-len
            //   content: '<div data-testid="kakaoMap" style="width:150px;text-align:center;padding:6px 0;">공연장</div>',
            // });
            // infowindow.open(map, marker);

            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
            map.setCenter(coords);

            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(map);
          }
        });
      });
    };
  }, [address, setPos]);
  return <MapWrapper id="map" />;
};

const MapWrapper = styled.div`
    width: 250px;
    height: 250px;
`;

export default ConcertLocationMap;
