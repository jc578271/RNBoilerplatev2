import {
  combineReducers,
  createSlice,
  PayloadAction,
  Store,
} from '@reduxjs/toolkit';
import {batch, useSelector} from 'react-redux';
import {RootState} from '@/store';

const initQueriedMonth: {[key: string]: boolean} = {};
export const queriedMonth = createSlice({
  name: 'queriedMonth',
  initialState: initQueriedMonth,
  reducers: {
    set: (state, action: PayloadAction<string>) => {
      return {...state, [action.payload]: true};
    },
    reset() {
      return {
        ...initQueriedMonth,
      };
    },
  },
});

export const globalReducer = combineReducers({
  queriedMonth: queriedMonth.reducer,
});

let _store: Store | undefined;

export const setGlobalStore = (store: Store) => {
  _store = store;
};

/** ----------------------------
 * --------queriedMonth---------*/

export const setQueriedMonthAction = (month: string) => {
  _store && _store.dispatch(queriedMonth.actions.set(month));
};

export const useQueriedMonth = (month: string) => {
  return useSelector((state: RootState) => state.global.queriedMonth[month]);
};

export const getQueriedMonth = (month: string) => {
  return _store?.getState().global.queriedMonth[month];
};

export const resetQueriedMonth = () => {
  _store && _store.dispatch(queriedMonth.actions.reset());
};

/**----------------
 * Global*/

export const resetGlobal = () => {
  batch(() => {
    resetQueriedMonth();
  });
};
