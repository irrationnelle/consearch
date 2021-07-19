import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render as rtlRender, RenderOptions, RenderResult } from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from 'react-query';
import { initialState as reducerInitialState, concert } from '../reducers';
import InitializationProvider from '../contexts/InitializationContext';

const render = (
  ui: any,
  {
    initialState = reducerInitialState,
    store = createStore(concert, initialState),
    ...renderOptions
  }: any = {},
): any => {
  const Wrapper = ({ children }: any): any => (
    <Provider store={store}>
      <MemoryRouter>{children}</MemoryRouter>
    </Provider>
  );
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

const queryClient = new QueryClient();

const renderWithProviders = (
  ui: React.ReactElement,
  renderOptions: Omit<RenderOptions, 'queries'> = {},
): RenderResult => {
  const Wrapper = ({ children }: {children: React.ReactNode}) => (
    <QueryClientProvider client={queryClient}>
      <InitializationProvider>
        {children}
      </InitializationProvider>
    </QueryClientProvider>
  );
  return rtlRender(ui, { wrapper: Wrapper as React.ComponentType, ...renderOptions });
};

// re-export everything
// eslint-disable-next-line import/no-extraneous-dependencies
export * from '@testing-library/react';

// override render method
export { render, renderWithProviders };
