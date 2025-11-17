const createSRTime = () => {
  const start = new Date('1970-01-01T09:30:00');
  const end = new Date('1970-01-01T10:10:00');
  const randomTime = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
  const hours = String(randomTime.getHours()).padStart(2, '0');
  const minutes = String(randomTime.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export default createSRTime;
