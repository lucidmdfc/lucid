export interface cashIn {
  id: string;
  projectId: string;
  amount: number;
  startDate: Date;
}
const generateDummyCashInData = (): cashIn[] => {
  const dummyData: cashIn[] = [];

  // Generate 10 dummy cashIn entries
  for (let i = 1; i <= 10; i++) {
    const cashInEntry: cashIn = {
      id: Math.random().toString(36).substring(7),
      projectId: `Project_${i}`, // Example project ID
      amount: Math.floor(Math.random() * 10000), // Random amount between 0 and 10000
      startDate: new Date(`2022-01-${i < 10 ? '0' + i : i}`), // Example start date for each entry
    };

    dummyData.push(cashInEntry);
  }

  return dummyData;
};

// Generate dummy cashIn data
export const dummyCashInData: cashIn[] = generateDummyCashInData();
