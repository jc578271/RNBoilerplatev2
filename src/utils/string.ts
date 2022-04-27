export const zeroPad = (nr: number, base: number) => {
  const len = String(base).length - String(nr).length + 1;
  return len > 0 ? new Array(len).join('0') + nr : nr;
};

export const round = (num: number, base: number) => {
  return Math.round(num / base) * base;
};

export const fround = (num: number, base:number) => {
  return Math.round(num * base) / base
}
