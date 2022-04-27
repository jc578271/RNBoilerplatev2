import {useEffect, useState} from 'react';
import moment from 'moment';
import {zeroPad} from '@/utils/string';

const dayOfWeekToString = [
  'CN',
  'Thứ 2',
  'Thứ 3',
  'Thứ 4',
  'Thứ 5',
  'Thứ 6',
  'Thứ 7',
];

export const dayOfWeekStr = (dateValue: number) =>
  dayOfWeekToString[moment(dateValue).day()];

/**
 * @param currentTime valueOf new Date()
 */
export const useTimer = (currentTime: number) => {
  const _currentTime = moment(currentTime);
  const [time, setTime] = useState({
    dayOfWeek: _currentTime.day(),
    date: _currentTime.format('DD/MM/YYYY'),
    hour: _currentTime.hour(),
    minute: _currentTime.minute(),
    second: _currentTime.second(),
  });

  useEffect(() => {
    let timeout = setTimeout(() => {
      setTime(prev => {
        let _prev = {...prev};
        let {second, minute, hour, dayOfWeek, date} = _prev;

        second++;

        if (second == 60) {
          minute++;
          second = 0;
        }

        if (minute == 60) {
          hour++;
          minute = 0;
        }

        if (hour == 24) {
          dayOfWeek = moment().dayOfYear();
          date = moment().format('DD/MM/YYYY');
          hour = 0;
        }

        return {...prev, dayOfWeek, date, second, minute, hour};
      });
    }, 1000);

    return () => clearTimeout(timeout);
  }, [time.second]);

  return {
    dayOfWeek: dayOfWeekToString[time.dayOfWeek],
    date: time.date,
    second: zeroPad(time.second, 10),
    minute: zeroPad(time.minute, 10),
    hour: zeroPad(time.hour, 10),
  };
};

interface Timesheet {
  [key: string]: string | number;
  time: string;
}

export const parseTimesheet = (timesheet: Timesheet[][]) => {
  return timesheet.map(date =>
    date.map(item => {
      let start = moment.duration(item.time.split('-')[0]).asSeconds();
      let end = moment.duration(item.time.split('-')[1]).asSeconds();
      return [start, end];
    }),
  );
};
