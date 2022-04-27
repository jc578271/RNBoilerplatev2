import moment from 'moment';
import {defaultParams, Fetch, newFormData, toUrlEncoded} from '@/utils/fetch';
import {getUser, setTimesheetAction} from '@/store/constant';
import {RawCheckInOut} from '@/types';
import {
  getCheckInOutQuery,
  setCheckInOutQueries,
  syncAllCheckInOuts,
} from '@/store/checkInOut/index';
import Toast from 'react-native-toast-message';

export interface RequestCheckin {
  time_start?: number;
  time_end?: number;
  client_id?: number;
}

interface ChildLog extends RawCheckInOut {
  [key: string]: any;
}

interface Log {
  logs: ChildLog;
  date: string;
  month_index: string;
  [key: string]: any;
}

export const requestCheckin = async (
  params: RequestCheckin,
  query?: {[key: string]: string},
  callback?: (data?: any) => void,
) => {
  const access_token = getUser()?.accessToken;
  const queryStr = query ? '?' + toUrlEncoded(query) : '';

  const formData = newFormData({
    ...params,
    ...defaultParams,
    client_auth: 1,
    access_token,
  });

  const {data} = await Fetch.post(
    'checkin.base.vn/ajax/api/me/logs' + queryStr,
    formData,
  );

  if (data.error) {
    return;
  }
  // callback
  if (callback) callback(data);
  // timesheet
  setTimesheetAction(data?.timesheet.shifts);
  // log
  const logs: Log[] = data?.logs || [];
  logs.forEach((log: Log) => {
    const accessories: RawCheckInOut[] = log.logs.map((item: ChildLog) => ({
      id: (item.time * 1000).toString(),
      time: item.time * 1000,
      photo: item.photo,
      lat: item.lat,
      lng: item.lng,
    }));
    syncAllCheckInOuts(accessories);
    const dateId = moment(parseInt(log.date + '000')).format('DD/MM/YYYY');
    const ids: string[] = accessories.map(item => item.id);
    setCheckInOutQueries({
      [dateId]: [...new Set([...getCheckInOutQuery(dateId), ...ids])],
    });
  });
};
//----------------------------------------
interface PostCheckin {
  lat: string;
  lng: string;
  client_id: number;
  ts: number;
  photo: any;
}

export const postCheckin = async (
  params: PostCheckin,
  callback?: (data?: any) => void,
) => {
  const access_token = getUser()?.accessToken;
  let formData = newFormData(
    {
      ...params,
      ...defaultParams,
      client_auth: 1,
      access_token,
    },
    ['photo'],
  );

  const {data} = await Fetch.post(
    'checkin.base.vn/ajax/api/me/checkin/mobile',
    formData,
  );

  if (data.error) {
    return;
  }

  if (data.message == 'ERROR: INVALID_DISTANCE') {
    Toast.show({
      type: 'error',
      props: {
        text: 'ERROR: INVALID_DISTANCE',
      },
    });
    return;
  }

  if (!data.message && callback) callback(data);
};
