import { cashIn } from 'src/types/cash-in';

const generateDummyCashInData = (): cashIn[] => {
  const dummyData: cashIn[] = [];

  // Generate 10 dummy cashIn entries
  for (let i = 1; i <= 10; i++) {
    const cashInEntry: cashIn = {
      id: Math.random().toString(36).substring(7),
      projectId: `Project_${i}`, // Example project ID
      amount: Math.floor(Math.random() * 10000), // Random amount between 0 and 10000
      startDate: new Date(`2022-01-${i < 10 ? '0' + i : i}`), // Example start date for each entry
      createdAt: new Date(Date.now() - i * 1000 * 60 * 60 * 24), // Varying dates
      updatedAt: new Date(Date.now() - i * 1000 * 60 * 60 * 24 * 2), // Varying dates
    };

    dummyData.push(cashInEntry);
  }

  return dummyData;
};

// Generate dummy cashIn data
export const dummyCashInData: cashIn[] = generateDummyCashInData();
