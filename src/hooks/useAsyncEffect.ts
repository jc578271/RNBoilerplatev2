import {useEffect} from 'react';

export const useAsyncEffect = (effect: () => void, deps?: any[]) => {
  useEffect(() => {
      effect();
  }, deps && [...deps]);
};
