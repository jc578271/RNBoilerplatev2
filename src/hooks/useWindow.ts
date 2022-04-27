import {Dimensions} from 'react-native';
import {useState, useEffect} from 'react';

export const useWindow = () => {
  const [window, setWindow] = useState(Dimensions.get('window'));

  useEffect(() => {
    const windowScale = Dimensions.addEventListener('change', ({window}) => {
      setWindow(window);
    });

    return () => {
      windowScale.remove();
    };
  }, [window]);

  return {...window, isLandscape: window.width > window.height};
};
