import {RawUser} from '@/types';
import {
  combineReducers,
  createSlice,
  PayloadAction,
  Store,
} from '@reduxjs/toolkit';
import {batch, useSelector} from 'react-redux';
import {RootState} from '@/store';

const initUserState: RawUser | null = null;
const user = createSlice({
  name: 'user',
  initialState: initUserState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      if (action.payload) return {...action.payload};
      return null;
    },
    reset: () => {
      return initUserState;
    },
  },
});

const initTimesheet: any[] = [];
const timesheet = createSlice({
  name: 'timesheet',
  initialState: initTimesheet,
  reducers: {
    setTimesheet: (state, action: PayloadAction<any>) => {
      if (action.payload) return action.payload;
      return [];
    },
    reset: () => {
      return initTimesheet;
    },
  },
});

export const constantReducer = combineReducers({
  user: user.reducer,
  timesheet: timesheet.reducer,
});

let _store: Store | undefined;

export const setConstantStore = (store: Store) => {
  _store = store;
};

/**-------------------
 * ---------user------*/

export const setUserAction = (data: RawUser | null) => {
  _store && _store.dispatch(user.actions.setUser(data));
};

export const useUser = (): RawUser | null => {
  return useSelector((state: RootState) => state.constants.user);
};

export const getUser = () => {
  return _store?.getState().constants.user;
};

export const resetUser = () => {
  _store && _store.dispatch(user.actions.reset());
};
/**----------------------
 * ---------timesheet------*/

export const setTimesheetAction = (data: any[] | null) => {
  _store && _store.dispatch(timesheet.actions.setTimesheet(data));
};

export const useTimesheet = () => {
  return useSelector((state: RootState) => state.constants.timesheet);
};

export const getTimesheet = () => {
  return _store?.getState().constants.timesheet;
};

export const resetTimesheet = () => {
  _store && _store.dispatch(timesheet.actions.reset());
};

export const resetConstants = () => {
  batch(() => {
    resetUser();
    resetTimesheet();
  })
};
