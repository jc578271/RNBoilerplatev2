/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {LogBox, StatusBar} from 'react-native';
import {Routes} from '@/Routes';
import SplashScreen from 'react-native-splash-screen';
import {persistor, store} from '@/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {CustomToast} from './components/CustomToast';

LogBox.ignoreLogs(['']);

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <Routes />
        <CustomToast />
      </PersistGate>
    </Provider>
  );
};

export default App;
