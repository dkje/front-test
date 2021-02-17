export const getPercentage = (a: number, b: number): string => {
  return ((a / b) * 100).toFixed(2);
};
