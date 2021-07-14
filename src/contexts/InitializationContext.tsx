import React, { createContext } from 'react';
import useFirebase from '../hooks/useFirebase';

const InitializationContext = createContext(null);

type Props = {
    children?: React.ReactNode;
};

const InitializationProvider = ({ children }: Props): JSX.Element => {
  useFirebase();

  return (
    <InitializationContext.Provider value={null}>
      {children}
    </InitializationContext.Provider>
  );
};

export default InitializationProvider;
