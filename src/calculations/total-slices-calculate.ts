import { slice } from 'src/types/slice';

export const calculateTotalAmount = (slices: slice[]): number => {
  // Using reduce to sum up the amounts of all slices
  return slices?.reduce((total, slice) => total + slice.amount, 0);
};
