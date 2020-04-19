declare namespace kakao.maps {
    export class LatLng {
        /**
         * WGS84 좌표 정보를 가지고 있는 객체를 생성한다.
         *
         * @param latitude 위도
         * @param longitude 경도
         */
        constructor(latitude: number, longitude: number)
    }

    export class Map {
        /**
         * 지도를 생성한다.
         *
         * @param container 지도가 표시될 HTML element
         * @param options
         */
        constructor(container: HTMLElement, options: MapOptions)
    }

    declare namespace services {
        export class Geocoder {
            constructor()

            addressSearch(address: string, callback: (result: any, status:any) => void) {
            }
        }
    }
}

