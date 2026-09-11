export interface HttpResType {
  isSuccess: boolean;
  message: string;
  code: string;
  data: unknown;
  status: number;
}
export enum HttpBusinessCode {
  jwtexpired = 'jwtexpired',
  invalidToken = 'invalidtoken',
  invalidSign = 'invalidsignature',
}
