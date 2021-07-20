import React, { createContext } from 'react';
import useFirebase from '../hooks/useFirebase';

const InitializationContext = createContext(null);

type Props = {
    children?: React.ReactNode;
};

const InitializationProvider = ({ children }: Props): JSX.Element => {
  const isFirebaseInitialized = useFirebase();

  return (
    <InitializationContext.Provider value={null}>
      {isFirebaseInitialized ? children : null}
    </InitializationContext.Provider>
  );
};

export default InitializationProvider;
