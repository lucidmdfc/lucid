import { Item } from 'src/types/item';

// Function to calculate the total amount of all items
const calculateTotalAmount = (items: Item[]): number => {
  // Using reduce to sum up the amounts of all items
  return items?.reduce((total, item) => total + item.amount, 0);
};

// Function to calculate total amounts including TVA (if active)
export const calculateTotals = (items: Item[], isTvaActive: boolean) => {
  // Calculate total amount without TVA
  const ht = calculateTotalAmount(items);

  // Calculate TVA percentage based on whether TVA is active or not
  const tvaPercentage = isTvaActive ? 0.2 : 0;

  // Calculate TVA amount
  const calculatedTva = ht * tvaPercentage;

  // Calculate total amount with TVA
  const total = ht + calculatedTva;

  // Return an object containing total amounts
  return { totalHt: ht, tva: calculatedTva, totalWithVat: total };
};
