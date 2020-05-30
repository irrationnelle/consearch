// test-utils.js
import React from 'react'

import { render as rtlRender } from '@testing-library/react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { initialState as reducerInitialState, concert } from './reducers'

const render = (
  ui: any,
  {
    initialState = reducerInitialState,
    store = createStore(concert, initialState),
    ...renderOptions
  }: any = {}
): any =>  {
  const Wrapper = ({ children }: any): any => (<Provider store={store}>
                                               <MemoryRouter>
                                               {children}</MemoryRouter></Provider>)
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { render }
