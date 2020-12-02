import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

import { concertSelector } from './selectors';
import ConcertLocationMap from './ConcertLocationMap';

export const path = (url: string): string => {
  const fixedPath: string = url.startsWith('/')
    ? path(url.substring(1))
    : url;

  return fixedPath;
};

const Concert: React.FC = (): ReactElement => {
  const { goBack } = useHistory();
  const { url } = useRouteMatch();

  const concertId = path(url);

  const { title, price, address } = useSelector(concertSelector(concertId));

  return (
    <ConcertWrapper>
      <BackButtonWrapper>
        <button type="button" onClick={goBack}>back</button>
      </BackButtonWrapper>
      <TextWrapper>
        <TextContent width="25%">title: </TextContent>
        <TextContent width="75%">{title}</TextContent>
      </TextWrapper>
      <TextWrapper>
        <TextContent width="25%">price: </TextContent>
        <TextContent width="75%">{price}</TextContent>
      </TextWrapper>
      <MapWrapper>
        <ConcertLocationMap address={address} />
      </MapWrapper>
    </ConcertWrapper>
  );
};

const ConcertWrapper = styled.div`
    width: 500px;
    height: 500px;
    display: flex;
    flex-direction: column;
    border: 1px solid black;
`;

const BackButtonWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const TextWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const TextContent = styled.div<{width: string}>`
    width: ${({ width }: {width: string}) => width}
`;

const MapWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 80%;
`;

export default Concert;
