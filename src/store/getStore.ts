import {Store} from '@reduxjs/toolkit';
import {RootState} from '@/store/index';

let _store: Store;

export const getStore = (): Store<RootState> => {
  if (!_store) {
    throw new Error('Please implement setStore before using this function');
  }

  return _store;
};

export const setStore = (store: Store) => {
  _store = store;
};

export default getStore;
