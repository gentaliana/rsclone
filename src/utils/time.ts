export interface ITimeObject {
  m: string;
  s: string;
}

export const secondsToTime = (secs: number): ITimeObject => {
  const divisorForMinutes = secs % (60 * 60);
  const minutes = Math.floor(divisorForMinutes / 60);

  const divisorForSeconds = divisorForMinutes % 60;
  const sec = Math.ceil(divisorForSeconds);

  const obj = {
    m: minutes < 10 ? `0${minutes}` : `${minutes}`,
    s: sec < 10 ? `0${sec}` : `${sec}`,
  };

  return obj;
};
