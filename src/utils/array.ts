export const arrayToObj = (arr: Record<string, any>[], mainKey: string) => {
  return arr.reduce((obj: Record<string, any>, next: any) => {
    obj[next[mainKey]] = next;
    return obj;
  }, {});
};

export const sortList = <T extends {[key: string]: any} | undefined>(
  arr: T[],
  keyName: string,
) => {
  return arr.sort((a, b) => (a && b ? a[keyName] - b[keyName] : 0));
};

export const findMin = (
  arr: ({[key: string]: any} | undefined)[],
  keyName: string,
) => {
  let min = Infinity;
  arr.forEach(item => {
    if (!item) return min;
    const value = item[keyName];
    min = Math.min(min, value);
  });

  return min;
};

export const findMax = (
  arr: ({[key: string]: any} | undefined)[],
  keyName: string,
) => {
  let max = -Infinity;
  arr.forEach(item => {
    if (!item) return max;
    const value = item[keyName];
    max = Math.max(max, value);
  });

  return max;
};
