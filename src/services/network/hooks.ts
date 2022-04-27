import NetInfo, {NetInfoState} from '@react-native-community/netinfo';
import {useEffect, useState} from 'react';

export const useNetwork = () => {
  const [state, setState] = useState<NetInfoState>();

  useEffect(() => {
    const event = NetInfo.addEventListener(state => {
      setState(state);
    });
  }, [state?.isConnected]);

  return state;
};
