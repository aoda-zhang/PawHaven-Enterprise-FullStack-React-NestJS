export const getCurrentEnv = () => {
  const nodeEnv = process.env.NODE_ENV?.toLowerCase();
  switch (nodeEnv) {
    case 'development':
    case 'dev':
      return 'dev';
    case 'uat':
      return 'uat';
    case 'test':
      return 'test';
    default:
      return 'uat';
  }
};
