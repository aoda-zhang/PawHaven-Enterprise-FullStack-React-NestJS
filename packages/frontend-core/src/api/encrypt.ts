import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
export type SignParams = {
  config: Record<string, unknown>;
  timestamp: string;
  prefix: string;
  privateKey: string;
};
export const getUTCTimestamp = () => {
  return Math.floor(dayjs.utc().valueOf() / 1000);
};
