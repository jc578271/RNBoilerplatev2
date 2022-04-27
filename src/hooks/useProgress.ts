import {useEffect, useState} from 'react';
import {fround} from '@/utils/string';

export const useProgress = (total: number = 0) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let timeout: any = null;
    if (progress < 0) {
      setProgress(0);
    } else if (progress < total) {
      timeout = setTimeout(() => {
        setProgress(fround(progress + 0.007, 700));
      }, 10);
    } else if (progress > total) {
      timeout = setTimeout(() => {
        setProgress(fround(progress - 0.05, 50));
      }, 10);
    }
    return () => clearTimeout(timeout);
  }, [progress, total]);

  return progress;
};
