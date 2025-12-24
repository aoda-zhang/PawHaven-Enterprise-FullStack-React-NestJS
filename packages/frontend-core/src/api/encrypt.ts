/* eslint-disable @typescript-eslint/no-explicit-any */
import CryptoJS from 'crypto-js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
export type SignParams = {
  config: Record<string, any>;
  timestamp: string;
  prefix: string;
  privateKey: string;
};
export const getUTCTimestamp = () => {
  return Math.floor(dayjs.utc().valueOf() / 1000);
};
const formatUrl = (url: string, prefix: string) => {
  return url.replace(prefix, '').replace(/\//g, '')?.toLowerCase();
};
export const generateSign = ({
  config,
  timestamp,
  prefix,
  privateKey,
}: SignParams): string => {
  const { data, url = '', method = '' } = config;
  const bodyString = data ? JSON.stringify(data) : '';
  return CryptoJS.HmacSHA256(
    `${formatUrl(
      url,
      prefix,
    )}> ${bodyString} +${method?.toUpperCase()}| ${timestamp} `,
    privateKey,
  ).toString(CryptoJS.enc.Hex);
};
