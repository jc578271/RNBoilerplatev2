import {createDynamicReducer} from '@/utils/createDynamicReducer';
import {RawCheckInOut} from '@/types';
import {batch} from 'react-redux';

const {
  setStore,
  reducer,
  sync,
  useByKey,
  useKeysByQuery,
  useQueries,
  setQueries,
  getByKey,
  getKeysByQuery,
  getQueries,
  removeByKey,
  reset,
} = createDynamicReducer<RawCheckInOut>('checkInOuts', 'id');

export const setCheckInOutStore = setStore;
export const checkInOutReducer = reducer;
export const syncCheckInOut = sync;
export const useCheckInOut = useByKey;
export const getCheckIn = getByKey;
export const useCheckInOutQuery = useKeysByQuery;
export const useCheckInOutQueries = useQueries;
export const setCheckInOutQueries = setQueries;
export const getCheckInOutQueries = getQueries;
export const getCheckInOutQuery = getKeysByQuery;
export const resetCheckIn = reset;

export const syncAllCheckInOuts = (accessories: RawCheckInOut[]) => {
  let query: {[id: string]: string[]} = {};
  let ids: string[] = [];

  for (let access of accessories) {
    ids.push(access.id.toString());
  }

  batch(() => {
    syncCheckInOut(accessories);
    setCheckInOutQueries({
      all: [...new Set([...getCheckInOutQuery('all'), ...ids])],
      ...query,
    });
  });
};

export const removeCheckInOut = (ids: string[]) => {
  let queries = getCheckInOutQueries();
  let query: {[id: string]: string[]} = {};
  for (let queryKey of queries) {
    query[queryKey] = getCheckInOutQuery(queryKey).filter(
      id => !ids.includes(id),
    );
  }

  batch(() => {
    removeByKey(ids);
    setCheckInOutQueries({
      ...query,
    });
  });
};
