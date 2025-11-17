const getCountryCode = (locale: string) => {
  const parts = locale?.split(/[_-]/);
  return parts.length > 1 ? parts[1].toUpperCase() : 'CN';
};
export default getCountryCode;
