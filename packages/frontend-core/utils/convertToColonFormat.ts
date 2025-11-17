function convertToColonFormat(input: string | number) {
  if (
    typeof input !== 'string' ||
    input.length !== 4 ||
    Number.isNaN(Number(input))
  ) {
    return 'Invalid input. Please provide a 4-digit string.';
  }
  const firstTwo = input.slice(0, 2);
  const lastTwo = input.slice(2);
  return `${firstTwo}:${lastTwo}`;
}
export default convertToColonFormat;
