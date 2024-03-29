import { useEffect, useState } from 'react';
import * as firebase from 'firebase/app';

const useFirebase = (): boolean => {
  const [isInit, setInit] = useState<boolean>(false);

  useEffect(() => {
    if (firebase.getApps().length > 0) {
      setInit(true);
      return;
    }

    firebase.initializeApp({
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    });

    setInit(true);
  }, []);

  return isInit;
};

export default useFirebase;
