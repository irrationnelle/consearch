import React from 'react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';
import { act, waitFor } from '@testing-library/react';
import { render, screen } from '../helpers/test-utils';

import InputData from '../InputData';
import inputTextByLabel from './helper/inputTextByLabel';
import InitializationProvider from '../contexts/InitializationContext';

const EXAMPLE_DATA = {
  title: '마스토돈',
  artist: '마스토돈',
  stage: '롤링홀',
  address: '서울 마포구 어울마당로 35',
  genre: 'rockmetal',
  date: '2021-06-26-20:00',
  coverImage: '',
};

describe('데이터 입력 화면 테스트에서,', () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    render(
      <QueryClientProvider client={queryClient}>
        <InitializationProvider>
          <InputData />
        </InitializationProvider>
      </QueryClientProvider>,
    );
  });

  it('필수 입력 데이터를 모두 입력하지 않으면 전송 버튼을 disabled 처리한다.', () => {
    // when
    inputTextByLabel('title-input', EXAMPLE_DATA.title);
    inputTextByLabel('artist-input', EXAMPLE_DATA.artist);
    inputTextByLabel('stage-input', EXAMPLE_DATA.stage);
    inputTextByLabel('address-input', EXAMPLE_DATA.address);
    inputTextByLabel('genre-input', EXAMPLE_DATA.genre);

    // then
    const submitButton = screen.getByRole('button');
    expect(submitButton).toHaveAttribute('disabled');
  });

  it('필수 입력 데이터를 전부 입력하면 전송 버튼을 통해 서버에 알맞은 정보를 전달한다.', async () => {
    // when
    inputTextByLabel('title-input', EXAMPLE_DATA.title);
    inputTextByLabel('artist-input', EXAMPLE_DATA.artist);
    inputTextByLabel('stage-input', EXAMPLE_DATA.stage);
    inputTextByLabel('address-input', EXAMPLE_DATA.address);
    inputTextByLabel('genre-input', EXAMPLE_DATA.genre);
    inputTextByLabel('date-input', EXAMPLE_DATA.date);

    // when
    const submitButton = screen.getByRole('button');
    expect(submitButton).not.toHaveAttribute('disabled');

    act(() => {
      userEvent.click(submitButton);
    });

    waitFor(() => {
      // then
      expect(screen.getByLabelText('title-input').textContent).toMatch('');
      expect(screen.getByLabelText('artist-input').textContent).toMatch('');
      expect(screen.getByLabelText('genre-input').textContent).toMatch('');
      expect(screen.getByLabelText('stage-input').textContent).toMatch('');
      expect(screen.getByLabelText('address-input').textContent).toMatch('');
      expect(screen.getByLabelText('date-input').textContent).toMatch('');

      expect(screen.getByLabelText('title').textContent).toMatch(EXAMPLE_DATA.title);
      expect(screen.getByLabelText('artist').textContent).toMatch(EXAMPLE_DATA.artist);
      expect(screen.getByLabelText('genre').textContent).toMatch(EXAMPLE_DATA.genre);
      expect(screen.getByLabelText('stage').textContent).toMatch(EXAMPLE_DATA.stage);
      expect(screen.getByLabelText('address').textContent).toMatch(EXAMPLE_DATA.address);
      expect(screen.getByLabelText('date').textContent).toMatch(EXAMPLE_DATA.date);
    }, { timeout: 60 * 1000 });
  });
});
