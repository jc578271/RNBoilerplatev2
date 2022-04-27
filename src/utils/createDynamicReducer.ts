import {createSlice, PayloadAction, Store} from '@reduxjs/toolkit';
import {arrayToObj} from '@/utils/array';
import {useSelector} from 'react-redux';

export type DynamicState<T> = {
  byKey: Record<string, T>;
  query: Record<string, string[]>;
};

export const createDynamicReducer = <T extends {[x: string]: any}>(
  name: string,
  mainKey: string,
  initialState: DynamicState<T> = {byKey: {}, query: {}},
) => {
  const {actions, reducer} = createSlice({
    name,
    initialState: initialState,
    reducers: {
      multiSet(state, action: PayloadAction<T[]>) {
        return {
          ...state,
          byKey: {
            ...state.byKey,
            ...arrayToObj(action.payload, mainKey),
          },
        };
      },
      setQueries(state, action: PayloadAction<Record<string, string[]>>) {
        return {
          ...state,
          query: {
            ...state.query,
            ...action.payload,
          },
        };
      },
      remove(state, action: PayloadAction<string[]>) {
        let _byKey = {...state.byKey};
        action.payload.forEach(id => {
          delete _byKey[id];
        });

        return {
          ...state,
        };
      },
      reset() {
        return {
          ...initialState,
        };
      },
    },
  });

  type RootState = Record<string, DynamicState<T>>;

  const useByKey = (key?: string): T | undefined => {
    return key
      ? useSelector((state: RootState) => state[name].byKey[key])
      : undefined;
  };

  const emptyArr: string[] = [];
  const useKeysByQuery = (query: string = 'default'): string[] => {
    return (
      useSelector((state: RootState) => state[name].query[query]) || emptyArr
    );
  };

  const useQueries = () => {
    return (
      useSelector((state: RootState) => Object.keys(state[name].query)) ||
      emptyArr
    );
  };

  let _store: Store | undefined;
  const setStore = (store: Store) => {
    _store = store;
  };

  const _getStore = (): Store => {
    if (!_store) {
      throw new Error(
        'You need to run setStore right after init store to use this function',
      );
    }

    return _store;
  };

  const getByKey = (key: string): T | undefined => {
    return _getStore().getState()[name].byKey[key];
  };

  const getKeysByQuery = (query: string): string[] => {
    return _getStore().getState()[name].query[query] || emptyArr;
  };

  const getQueries = () => {
    return Object.keys(_getStore().getState()[name].query) || emptyArr;
  };

  const sync = (items: T[]) => {
    return _getStore().dispatch(actions.multiSet(items));
  };

  const setQueries = (queries: Record<string, string[]>) => {
    return _getStore().dispatch(actions.setQueries(queries));
  };

  const removeByKey = (keys: string[]) => {
    return _getStore().dispatch(actions.remove(keys));
  };

  const reset = () => {
    return _getStore().dispatch(actions.reset());
  };

  return {
    name,
    actions,
    reducer,
    useByKey,
    useKeysByQuery,
    useQueries,
    getByKey,
    getKeysByQuery,
    getQueries,
    setStore,
    sync,
    setQueries,
    removeByKey,
    reset,
  };
};
