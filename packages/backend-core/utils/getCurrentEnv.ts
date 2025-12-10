import { EnvConstant } from '../constants/constant';

export const getCurrentEnv = () => {
  const nodeEnv = process.env.NODE_ENV?.toLowerCase();
  switch (nodeEnv) {
    case 'development':
    case EnvConstant.dev:
      return 'dev';
    case 'uat':
      return EnvConstant.uat;
    case 'test':
      return EnvConstant.test;
    case 'prod':
    case 'production':
      return EnvConstant.prod;
    default:
      return EnvConstant.uat;
  }
};
