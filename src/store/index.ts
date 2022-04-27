import {applyMiddleware, combineReducers, createStore,} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import {checkInOutReducer, setCheckInOutStore} from '@/store/checkInOut';
import {setStore} from '@/store/getStore';
import {constantReducer, setConstantStore} from '@/store/constant';
import {globalReducer, setGlobalStore} from '@/store/global';
import {composeWithDevTools} from 'redux-devtools-extension';

export const appReducer = combineReducers({
  global: globalReducer,
  checkInOuts: checkInOutReducer,
  constants: constantReducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET_STORE_DATA') {
    //Clear store state
    state = undefined;
  }

  return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: 'root',
  whitelist: ['constants'],
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let middlewares: any[] = [];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default; // <-- ADD THIS
  middlewares.push(createDebugger());
  middlewares.push(thunk);
}

const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

export const store = createStore(persistedReducer, enhancer);
export const persistor = persistStore(store);

export default store;

setStore(store);
setCheckInOutStore(store);
setConstantStore(store);
setGlobalStore(store);
