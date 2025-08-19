import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState<any>(true);
  const [justReconnected, setJustReconnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected !== isConnected) {
        if (state.isConnected) {
          setJustReconnected(true);
          setTimeout(() => setJustReconnected(false), 3000); // Show "We are back" for 3 seconds
        }
        setIsConnected(state.isConnected);
      }
    });

    return () => unsubscribe();
  }, [isConnected]);

  return { isConnected, justReconnected };
};

export default useNetworkStatus;
