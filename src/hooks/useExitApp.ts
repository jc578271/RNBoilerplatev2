import {useEffect, useState} from 'react';
import {
  getFocusedRouteNameFromRoute,
  useNavigationState,
  useRoute,
} from '@react-navigation/native';
import {BackHandler, Platform, ToastAndroid} from 'react-native';

export const useExitApp = () => {
  const [exitApp, setExitApp] = useState(0);
  const state = useNavigationState(state => state);

  useEffect(() => {
    // Exit app handler
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (Platform.OS != 'ios' && state.index == 0) {
          setTimeout(() => setExitApp(0), 2000);
          if (exitApp == 0) {
            setExitApp(prev => prev + 1);
            ToastAndroid.show('tab back again to exit', ToastAndroid.SHORT);
          } else if (exitApp == 1) {
            BackHandler.exitApp();
          }
          return true;
        }
      },
    );

    return () => {
      backHandler.remove();
    };
  }, [exitApp, state]);
};
